
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

// Configure Cloudinary
function configureCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    // If CLOUDINARY_URL is provided, use it directly
    cloudinary.config(process.env.CLOUDINARY_URL);
  } else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    // If individual credentials are provided, construct the URL and configure
    const cloudinaryUrl = `cloudinary://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@${process.env.CLOUDINARY_CLOUD_NAME}`;
    cloudinary.config(cloudinaryUrl);
  } else {
    throw new Error('Cloudinary credentials not configured. Please set CLOUDINARY_URL or individual credentials (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).');
  }
}

configureCloudinary();

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
    file.includes('_cropped') && 
    imageExtensions.some(ext => file.toLowerCase().endsWith(ext))
  );
}

async function upscaleImage(imagePath: string, outputPath: string): Promise<void> {
  try {
    // Upload original to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imagePath, {
      folder: 'optiquelens/temp',
      resource_type: 'auto',
    });

    console.log(`  📤 Uploaded to Cloudinary: ${uploadResult.public_id}`);

    // Generate upscaled version with background removal using Cloudinary's transformations
    // Chain upscale + background removal to ensure transparency
    const upscaledUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        { effect: 'upscale' },
        { effect: 'background_removal' }
      ],
      quality: 'auto:best',
      fetch_format: 'png',
    });

    console.log(`  🔄 Downloading upscaled and background-removed image...`);

    // Download upscaled image
    const response = await fetch(upscaledUrl);
    if (!response.ok) {
      throw new Error(`Failed to download upscaled image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    await fs.writeFile(outputPath, Buffer.from(buffer));

    // Clean up temporary upload
    await cloudinary.uploader.destroy(uploadResult.public_id);

    console.log(`  ✓ Upscaled image saved`);
  } catch (error) {
    throw new Error(`Upscaling failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function processFolder(folderPath: string, folderName: string): Promise<ProcessResult> {
  try {
    const croppedImages = await getImageFiles(folderPath);
    
    if (croppedImages.length === 0) {
      return {
        folder: folderName,
        status: 'skipped',
        message: 'No cropped images found'
      };
    }

    let processedCount = 0;

    for (const imageFile of croppedImages) {
      const imagePath = path.join(folderPath, imageFile);
      const ext = path.extname(imageFile);
      const baseName = path.basename(imageFile, ext);
      const outputPath = path.join(folderPath, `${baseName}_upscaled${ext}`);

      // Skip if upscaled version already exists
      try {
        await fs.access(outputPath);
        console.log(`  ⏭  Skipping ${imageFile} - upscaled version already exists`);
        continue;
      } catch {
        // File doesn't exist, proceed with processing
      }

      console.log(`  🔄 Processing: ${imageFile}`);
      await upscaleImage(imagePath, outputPath);
      console.log(`  ✓ Created: ${path.basename(outputPath)}`);
      processedCount++;

      // Add delay between API calls
      if (processedCount < croppedImages.length) {
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
        console.log('No subfolders or cropped images found in the directory');
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
    console.log(`   📸 Total images upscaled: ${totalProcessed}`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('Error processing frames:', error);
    throw error;
  }
}

const framesDir = process.argv[2] || './client/public/Frames';

console.log('='.repeat(60));
console.log('Image Upscaling Tool - Cloudinary API');
console.log('Upscales images with _cropped suffix');
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
