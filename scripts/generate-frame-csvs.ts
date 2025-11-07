import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';
import path from 'path';

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ ERROR: GEMINI_API_KEY environment variable is not set.');
  console.error('Please configure your Gemini API key in Replit secrets.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

interface FrameData {
  Name: string;
  Code: string;
  Variation_Exists: string;
  Variation_Code: string;
  Shape: string;
  Gender: string;
  Material: string;
  Size: string;
  Color: string;
}

async function getImageFiles(folderPath: string): Promise<string[]> {
  const files = await fs.readdir(folderPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  return files.filter(file => 
    imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
  );
}

async function fileToGenerativePart(filePath: string): Promise<{ inlineData: { data: string; mimeType: string } }> {
  const imageBuffer = await fs.readFile(filePath);
  const base64Image = imageBuffer.toString('base64');
  
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: { [key: string]: string } = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif'
  };
  
  return {
    inlineData: {
      data: base64Image,
      mimeType: mimeTypes[ext] || 'image/jpeg'
    }
  };
}

async function analyzeFrameWithGemini(folderPath: string, folderName: string): Promise<Partial<FrameData>> {
  try {
    const imageFiles = await getImageFiles(folderPath);
    
    if (imageFiles.length === 0) {
      console.log(`No images found in ${folderName}`);
      return {
        Name: folderName,
        Code: folderName.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
        Color: 'Unknown'
      };
    }

    console.log(`Analyzing ${imageFiles.length} images for ${folderName}...`);
    
    const imageParts = await Promise.all(
      imageFiles.slice(0, 5).map(file => fileToGenerativePart(path.join(folderPath, file)))
    );

    const prompt = `Analyze these eyeglass frame images and provide:
1. A creative, marketable product name for this frame (consider style, shape, and aesthetic)
2. A unique product code (6-8 characters, alphanumeric, based on key features)
3. The frame shape (e.g., "Round", "Square", "Cat-Eye", "Aviator", "Rectangle", "Oval")
4. The gender category - MUST be one of: Unisex, Female, Male
5. The frame material - MUST be one of: Acetate, Titanium
6. The frame size - MUST be one of: Small, Medium, Large
7. The primary color - provide a SINGLE WORD color (e.g., "Black", "Brown", "Gold", "Silver", "Tortoise")

Respond in this exact format:
NAME: [product name]
CODE: [product code]
SHAPE: [frame shape]
GENDER: [Unisex/Female/Male]
MATERIAL: [Acetate/Titanium]
SIZE: [Small/Medium/Large]
COLOR: [single word color]

Be concise and professional.`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    console.log(`Gemini response for ${folderName}:`, text);
    
    const nameMatch = text.match(/NAME:\s*(.+)/i);
    const codeMatch = text.match(/CODE:\s*(.+)/i);
    const shapeMatch = text.match(/SHAPE:\s*(.+)/i);
    const genderMatch = text.match(/GENDER:\s*(.+)/i);
    const materialMatch = text.match(/MATERIAL:\s*(.+)/i);
    const sizeMatch = text.match(/SIZE:\s*(.+)/i);
    const colorMatch = text.match(/COLOR:\s*(.+)/i);
    
    return {
      Name: nameMatch ? nameMatch[1].trim() : folderName,
      Code: codeMatch ? codeMatch[1].trim() : folderName.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
      Shape: shapeMatch ? shapeMatch[1].trim() : 'Unknown',
      Gender: genderMatch ? genderMatch[1].trim() : 'Unisex',
      Material: materialMatch ? materialMatch[1].trim() : 'Acetate',
      Size: sizeMatch ? sizeMatch[1].trim() : 'Medium',
      Color: colorMatch ? colorMatch[1].trim() : 'Unknown'
    };
    
  } catch (error) {
    console.error(`Error analyzing ${folderName}:`, error);
    return {
      Name: folderName,
      Code: folderName.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
      Shape: 'Unknown',
      Gender: 'Unisex',
      Material: 'Acetate',
      Size: 'Medium',
      Color: 'Unknown'
    };
  }
}

function createCSVContent(data: FrameData): string {
  const headers = ['Name', 'Code', 'Variation_Exists', 'Variation_Code', 'Shape', 'Gender', 'Material', 'Size', 'Color'];
  const values = [
    data.Name,
    data.Code,
    data.Variation_Exists,
    data.Variation_Code,
    data.Shape,
    data.Gender,
    data.Material,
    data.Size,
    data.Color
  ];
  
  const escapedValues = values.map(v => {
    if (v.includes(',') || v.includes('"') || v.includes('\n')) {
      return `"${v.replace(/"/g, '""')}"`;
    }
    return v;
  });
  
  return `${headers.join(',')}\n${escapedValues.join(',')}`;
}

async function processFramesFolder(framesDir: string) {
  try {
    const entries = await fs.readdir(framesDir, { withFileTypes: true });
    const subfolders = entries.filter(entry => entry.isDirectory());
    
    if (subfolders.length === 0) {
      console.log('No subfolders found in FRAMES directory');
      return;
    }
    
    console.log(`Found ${subfolders.length} frame folders to process`);
    
    for (const folder of subfolders) {
      const folderPath = path.join(framesDir, folder.name);
      console.log(`\nProcessing folder: ${folder.name}`);
      
      const geminiData = await analyzeFrameWithGemini(folderPath, folder.name);
      
      const frameData: FrameData = {
        Name: geminiData.Name || folder.name,
        Code: geminiData.Code || folder.name.toUpperCase(),
        Variation_Exists: 'N',
        Variation_Code: 'N',
        Shape: geminiData.Shape || 'Unknown',
        Gender: geminiData.Gender || 'Unisex',
        Material: geminiData.Material || 'Acetate',
        Size: geminiData.Size || 'Medium',
        Color: geminiData.Color || 'Unknown'
      };
      
      const csvContent = createCSVContent(frameData);
      const csvPath = path.join(folderPath, `${folder.name}.csv`);
      
      await fs.writeFile(csvPath, csvContent, 'utf-8');
      console.log(`✓ CSV created: ${csvPath}`);
      console.log(`  Name: ${frameData.Name}`);
      console.log(`  Code: ${frameData.Code}`);
      console.log(`  Shape: ${frameData.Shape}`);
      console.log(`  Gender: ${frameData.Gender}`);
      console.log(`  Material: ${frameData.Material}`);
      console.log(`  Size: ${frameData.Size}`);
      console.log(`  Color: ${frameData.Color}`);
      
      const delayMs = parseInt(process.env.API_DELAY_MS || '1000');
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    
    console.log(`\n✅ Successfully processed ${subfolders.length} frames!`);
    
  } catch (error) {
    console.error('Error processing frames:', error);
    throw error;
  }
}

const framesDir = process.argv[2] || './FRAMES';

console.log('='.repeat(60));
console.log('Frame CSV Generator with Gemini AI');
console.log('='.repeat(60));
console.log(`Processing directory: ${framesDir}\n`);

processFramesFolder(framesDir)
  .then(() => {
    console.log('\n' + '='.repeat(60));
    console.log('Processing complete!');
    console.log('='.repeat(60));
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
