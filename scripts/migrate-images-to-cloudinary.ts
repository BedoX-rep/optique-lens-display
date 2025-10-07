import { uploadImageToCloudinary } from '../shared/cloudinary-utils';
import fs from 'fs';
import path from 'path';

interface ImageMapping {
  originalPath: string;
  cloudinaryUrl: string;
  publicId: string;
}

async function migrateImagesToCloudinary() {
  const imageMappings: ImageMapping[] = [];
  const attachedAssetsDir = path.join(process.cwd(), 'attached_assets');
  
  console.log('Starting image migration to Cloudinary...');
  console.log(`Looking for images in: ${attachedAssetsDir}`);

  if (!fs.existsSync(attachedAssetsDir)) {
    console.error('attached_assets directory not found!');
    process.exit(1);
  }

  // Function to recursively find all image files
  function findImageFiles(dir: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findImageFiles(fullPath));
      } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(item)) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const imageFiles = findImageFiles(attachedAssetsDir);
  console.log(`Found ${imageFiles.length} images to upload`);

  for (const imagePath of imageFiles) {
    try {
      // Get relative path from attached_assets
      const relativePath = path.relative(attachedAssetsDir, imagePath);
      const filename = path.basename(imagePath, path.extname(imagePath));
      
      // Determine folder structure in Cloudinary based on subdirectory
      const dirName = path.dirname(relativePath);
      const cloudinaryFolder = dirName === '.' 
        ? 'optiquelens' 
        : `optiquelens/${dirName.replace(/\\/g, '/')}`;

      console.log(`Uploading: ${relativePath}...`);
      
      const result = await uploadImageToCloudinary(imagePath, cloudinaryFolder);
      
      imageMappings.push({
        originalPath: `/attached_images/${relativePath.replace(/\\/g, '/')}`,
        cloudinaryUrl: result.secure_url,
        publicId: result.public_id,
      });

      console.log(`✓ Uploaded: ${relativePath} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${imagePath}:`, error);
    }
  }

  // Save mappings to a JSON file
  const mappingsPath = path.join(process.cwd(), 'image-mappings.json');
  fs.writeFileSync(mappingsPath, JSON.stringify(imageMappings, null, 2));
  
  console.log(`\n✓ Migration complete!`);
  console.log(`✓ Uploaded ${imageMappings.length} images`);
  console.log(`✓ Mappings saved to: ${mappingsPath}`);
  
  // Print summary
  console.log('\n--- Image Mappings ---');
  imageMappings.forEach(mapping => {
    console.log(`${mapping.originalPath} -> ${mapping.cloudinaryUrl}`);
  });
}

migrateImagesToCloudinary().catch(error => {
  console.error('Migration failed:', error);
  process.exit(1);
});
