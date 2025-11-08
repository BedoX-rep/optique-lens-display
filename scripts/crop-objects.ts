
import { promises as fs } from 'fs';
import path from 'path';

// Load all available API keys
const apiKeys: string[] = [];

// Check for REMOVEBG_API first (legacy naming)
if (process.env.REMOVEBG_API) {
  apiKeys.push(process.env.REMOVEBG_API);
}

// Then check for REMOVEBG_API1, REMOVEBG_API2, etc.
for (let i = 1; i <= 4; i++) {
  const key = process.env[`REMOVEBG_API${i}`];
  if (key && !apiKeys.includes(key)) { // Avoid duplicates
    apiKeys.push(key);
  }
}

if (apiKeys.length === 0) {
  console.error('❌ ERROR: No REMOVEBG_API keys found.');
  console.error('Please configure at least REMOVEBG_API or REMOVEBG_API1 in Replit secrets.');
  console.error('You can add REMOVEBG_API2, REMOVEBG_API3, REMOVEBG_API4 for additional capacity.');
  process.exit(1);
}

console.log(`🔑 Loaded ${apiKeys.length} API key(s)`);

const REMOVEBG_API_URL = 'https://api.remove.bg/v1.0/removebg';
const MAX_REQUESTS_PER_KEY = 50;

// Track usage for each API key
let currentKeyIndex = 0;
let requestsWithCurrentKey = 0;

interface ProcessResult {
  folder: string;
  status: 'success' | 'skipped' | 'failed';
  message: string;
  processed?: number;
}

async function getImageFiles(folderPath: string): Promise<string[]> {
  const files = await fs.readdir(folderPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  return files.filter(file => 
    imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
  );
}

function switchToNextKey(): boolean {
  if (currentKeyIndex + 1 < apiKeys.length) {
    currentKeyIndex++;
    requestsWithCurrentKey = 0;
    console.log(`\n🔄 Switching to API key ${currentKeyIndex + 1}/${apiKeys.length}`);
    return true;
  }
  return false;
}

async function cropObject(imagePath: string, outputPath: string): Promise<void> {
  const imageBuffer = await fs.readFile(imagePath);
  
  const formData = new FormData();
  const blob = new Blob([imageBuffer]);
  formData.append('image_file', blob, path.basename(imagePath));
  formData.append('size', 'auto');
  formData.append('crop', 'true');
  formData.append('crop_margin', '5px');
  
  // Check if we need to switch to next API key
  if (requestsWithCurrentKey >= MAX_REQUESTS_PER_KEY) {
    if (!switchToNextKey()) {
      throw new Error(`All ${apiKeys.length} API keys have reached their ${MAX_REQUESTS_PER_KEY} request limit`);
    }
  }
  
  const currentApiKey = apiKeys[currentKeyIndex];
  
  const response = await fetch(REMOVEBG_API_URL, {
    method: 'POST',
    headers: {
      'X-Api-Key': currentApiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    
    // Check if it's a rate limit error
    if (response.status === 429 || errorText.includes('rate limit') || errorText.includes('quota')) {
      console.log(`  ⚠️  API key ${currentKeyIndex + 1} hit rate limit`);
      
      // Try switching to next key
      if (switchToNextKey()) {
        console.log(`  🔄 Retrying with next API key...`);
        return cropObject(imagePath, outputPath); // Retry with new key
      } else {
        throw new Error(`All API keys exhausted. Error: ${errorText}`);
      }
    }
    
    throw new Error(`Remove.bg API error: ${response.status} - ${errorText}`);
  }

  requestsWithCurrentKey++;
  console.log(`  📊 API key ${currentKeyIndex + 1}: ${requestsWithCurrentKey}/${MAX_REQUESTS_PER_KEY} requests used`);

  const resultBuffer = await response.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(resultBuffer));
}

async function processFolder(folderPath: string, folderName: string): Promise<ProcessResult> {
  try {
    const imageFiles = await getImageFiles(folderPath);
    
    // Check if folder already has more than 2 images (already processed)
    if (imageFiles.length > 2) {
      return {
        folder: folderName,
        status: 'skipped',
        message: `Already processed (${imageFiles.length} images found)`
      };
    }

    if (imageFiles.length === 0) {
      return {
        folder: folderName,
        status: 'skipped',
        message: 'No images found'
      };
    }

    // Process up to 2 images
    const imagesToProcess = imageFiles.slice(0, 2);
    let processedCount = 0;

    for (const imageFile of imagesToProcess) {
      const imagePath = path.join(folderPath, imageFile);
      const ext = path.extname(imageFile);
      const baseName = path.basename(imageFile, ext);
      const outputPath = path.join(folderPath, `${baseName}_cropped.png`);

      // Skip if output already exists
      try {
        await fs.access(outputPath);
        console.log(`  ⏭  Skipping ${imageFile} - cropped version already exists`);
        continue;
      } catch {
        // File doesn't exist, proceed with processing
      }

      console.log(`  🔄 Processing: ${imageFile}`);
      await cropObject(imagePath, outputPath);
      console.log(`  ✓ Created: ${baseName}_cropped.png`);
      processedCount++;

      // Add delay between API calls to avoid rate limits
      if (processedCount < imagesToProcess.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return {
      folder: folderName,
      status: 'success',
      message: `Processed ${processedCount} image(s)`,
      processed: processedCount
    };

  } catch (error) {
    return {
      folder: folderName,
      status: 'failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function processAllFrames(framesDir: string) {
  try {
    const stats = await fs.stat(framesDir);
    
    // Check if it's a single folder with images or a parent folder with subfolders
    const imageFiles = await getImageFiles(framesDir);
    const hasImages = imageFiles.length > 0;
    
    let results: ProcessResult[] = [];
    
    if (hasImages) {
      // Single folder mode
      console.log(`\n📂 Processing single folder: ${path.basename(framesDir)}\n`);
      const result = await processFolder(framesDir, path.basename(framesDir));
      results.push(result);
      
      if (result.status === 'success') {
        console.log(`✓ ${result.message}`);
      } else if (result.status === 'skipped') {
        console.log(`⏭  ${result.message}`);
      } else {
        console.log(`❌ ${result.message}`);
      }
    } else {
      // Multiple folders mode
      const entries = await fs.readdir(framesDir, { withFileTypes: true });
      const subfolders = entries.filter(entry => entry.isDirectory());
      
      if (subfolders.length === 0) {
        console.log('No subfolders or images found in the directory');
        return;
      }
      
      console.log(`\n📂 Found ${subfolders.length} frame folders\n`);
      
      for (let i = 0; i < subfolders.length; i++) {
        const folder = subfolders[i];
        const folderPath = path.join(framesDir, folder.name);
        
        console.log(`[${i + 1}/${subfolders.length}] Processing: ${folder.name}`);
        
        const result = await processFolder(folderPath, folder.name);
        results.push(result);
        
        if (result.status === 'success') {
          console.log(`  ✓ ${result.message}`);
        } else if (result.status === 'skipped') {
          console.log(`  ⏭  ${result.message}`);
        } else {
          console.log(`  ❌ ${result.message}`);
        }
        
        console.log('');
      }
    }
    
    // Summary
    const successful = results.filter(r => r.status === 'success').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const totalProcessed = results
      .filter(r => r.status === 'success')
      .reduce((sum, r) => sum + (r.processed || 0), 0);
    
    console.log('='.repeat(60));
    console.log('📊 Summary:');
    console.log(`   ✓ Successful: ${successful} folders`);
    console.log(`   ⏭  Skipped: ${skipped} folders`);
    console.log(`   ❌ Failed: ${failed} folders`);
    console.log(`   📸 Total images processed: ${totalProcessed}`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('Error processing frames:', error);
    throw error;
  }
}

const framesDir = process.argv[2] || './client/public/Frames';

console.log('='.repeat(60));
console.log('Object Cropping Tool - Remove.bg API');
console.log('Crops objects with 5px margin');
console.log('='.repeat(60));
console.log(`Processing directory: ${framesDir}\n`);

processAllFrames(framesDir)
  .then(() => {
    console.log('\n✅ Processing complete!');
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
