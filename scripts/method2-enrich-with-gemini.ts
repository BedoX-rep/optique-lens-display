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

async function parseCSV(csvPath: string): Promise<FrameData | null> {
  try {
    const content = await fs.readFile(csvPath, 'utf-8');
    const lines = content.trim().split('\n');
    
    if (lines.length < 2) return null;
    
    const headers = lines[0].split(',');
    const values = lines[1].split(',').map(v => {
      if (v.startsWith('"') && v.endsWith('"')) {
        return v.slice(1, -1).replace(/""/g, '"');
      }
      return v;
    });
    
    const data: any = {};
    headers.forEach((header, index) => {
      data[header] = values[index] || '';
    });
    
    return data as FrameData;
  } catch {
    return null;
  }
}

function createCSVContent(data: FrameData): string {
  const headers = ['Name', 'Code', 'Variation_Exists', 'Variation_Code', 'Size', 'Color'];
  const values = [
    data.Name,
    data.Code,
    data.Variation_Exists,
    data.Variation_Code,
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

async function analyzeFrameWithGemini(folderPath: string, folderName: string): Promise<Partial<FrameData>> {
  try {
    const imageFiles = await getImageFiles(folderPath);
    
    if (imageFiles.length === 0) {
      console.log(`  ⚠ No images found`);
      return {};
    }

    console.log(`  📸 Analyzing ${imageFiles.length} image(s)...`);
    
    const imageParts = await Promise.all(
      imageFiles.slice(0, 5).map(file => fileToGenerativePart(path.join(folderPath, file)))
    );

    const prompt = `Analyze these eyeglass frame images and provide:
1. A creative, marketable product name for this frame (consider style, shape, and aesthetic)
2. A unique product code (6-8 characters, alphanumeric, based on key features)
3. The primary color(s) of the frame (be specific, e.g., "Matte Black", "Tortoise Brown", "Rose Gold")

Respond in this exact format:
NAME: [product name]
CODE: [product code]
COLOR: [color description]

Be concise and professional.`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    const nameMatch = text.match(/NAME:\s*(.+)/i);
    const codeMatch = text.match(/CODE:\s*(.+)/i);
    const colorMatch = text.match(/COLOR:\s*(.+)/i);
    
    return {
      Name: nameMatch ? nameMatch[1].trim() : undefined,
      Code: codeMatch ? codeMatch[1].trim() : undefined,
      Color: colorMatch ? colorMatch[1].trim() : undefined
    };
    
  } catch (error) {
    console.log(`  ❌ Error analyzing:`, error instanceof Error ? error.message : 'Unknown error');
    return {};
  }
}

async function enrichCSVs(framesDir: string) {
  try {
    const entries = await fs.readdir(framesDir, { withFileTypes: true });
    const subfolders = entries.filter(entry => entry.isDirectory());
    
    if (subfolders.length === 0) {
      console.log('No subfolders found in frames directory');
      return;
    }
    
    console.log(`\n🔍 Scanning ${subfolders.length} frame folders...`);
    
    // First pass: identify which frames need processing
    const framesToProcess: Array<{ folder: string; path: string; csvPath: string }> = [];
    let alreadyEnriched = 0;
    let missingCSV = 0;
    
    for (const folder of subfolders) {
      const folderPath = path.join(framesDir, folder.name);
      const csvPath = path.join(folderPath, `${folder.name}.csv`);
      
      const existingData = await parseCSV(csvPath);
      if (!existingData) {
        missingCSV++;
        continue;
      }
      
      // Check if Color field is empty or "To be determined"
      if (!existingData.Color || existingData.Color.trim() === '' || existingData.Color === 'To be determined') {
        framesToProcess.push({ folder: folder.name, path: folderPath, csvPath });
      } else {
        alreadyEnriched++;
      }
    }
    
    console.log(`\n📊 Scan Results:`);
    console.log(`   ✓ Already enriched: ${alreadyEnriched}`);
    console.log(`   ⊘ Missing CSV: ${missingCSV}`);
    console.log(`   📝 Need processing: ${framesToProcess.length}`);
    
    if (framesToProcess.length === 0) {
      console.log(`\n✅ All frames are already enriched!`);
      return;
    }
    
    console.log(`\n🚀 Starting AI enrichment for ${framesToProcess.length} frames...`);
    
    let enriched = 0;
    let failed = 0;
    
    for (let i = 0; i < framesToProcess.length; i++) {
      const { folder, path: folderPath, csvPath } = framesToProcess[i];
      
      console.log(`\n[${i + 1}/${framesToProcess.length}] Processing: ${folder}`);
      
      const existingData = await parseCSV(csvPath);
      if (!existingData) {
        console.log(`  ⊘ Skipped - CSV disappeared`);
        failed++;
        continue;
      }
      
      const geminiData = await analyzeFrameWithGemini(folderPath, folder);
      
      if (!geminiData.Name && !geminiData.Code && !geminiData.Color) {
        console.log(`  ⚠ Failed - No data from Gemini`);
        failed++;
        continue;
      }
      
      const enrichedData: FrameData = {
        Name: geminiData.Name || existingData.Name,
        Code: geminiData.Code || existingData.Code,
        Variation_Exists: existingData.Variation_Exists,
        Variation_Code: existingData.Variation_Code,
        Size: existingData.Size,
        Color: geminiData.Color || 'Unknown'
      };
      
      const csvContent = createCSVContent(enrichedData);
      await fs.writeFile(csvPath, csvContent, 'utf-8');
      
      console.log(`  ✓ Enriched successfully`);
      console.log(`    Name: ${enrichedData.Name}`);
      console.log(`    Code: ${enrichedData.Code}`);
      console.log(`    Color: ${enrichedData.Color}`);
      enriched++;
      
      const delayMs = parseInt(process.env.API_DELAY_MS || '7000');
      console.log(`  ⏳ Waiting ${delayMs/1000}s before next request...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    
    console.log(`\n✅ Method 2 Complete!`);
    console.log(`   Enriched: ${enriched} CSVs`);
    console.log(`   Failed: ${failed} (no images or API error)`);
    
    if (enriched + failed < framesToProcess.length) {
      const remaining = framesToProcess.length - enriched - failed;
      console.log(`\n⏸ Processing paused (likely rate limit hit)`);
      console.log(`   Remaining: ${remaining} frames`);
      console.log(`   Run the script again to continue processing`);
    }
    
  } catch (error) {
    console.error('Error enriching CSVs:', error);
    throw error;
  }
}

const framesDir = process.argv[2] || './client/public/Frames';

console.log('='.repeat(60));
console.log('METHOD 2: Gemini AI Enrichment');
console.log('='.repeat(60));
console.log(`Processing directory: ${framesDir}\n`);

enrichCSVs(framesDir)
  .then(() => {
    console.log('\n' + '='.repeat(60));
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
