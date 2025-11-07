import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import FormData from 'form-data';
import axios from 'axios';

if (!process.env.WOOCOMMERCE_URL) {
  console.error('❌ ERROR: WOOCOMMERCE_URL environment variable is not set.');
  process.exit(1);
}

if (!process.env.WOOCOMMERCE_CONSUMER_KEY || !process.env.WOOCOMMERCE_CONSUMER_SECRET) {
  console.error('❌ ERROR: WooCommerce API credentials not set.');
  process.exit(1);
}

if (!process.env.WORDPRESS_REST_API) {
  console.error('❌ ERROR: WORDPRESS_REST_API environment variable is not set.');
  console.error('   This should be in the format: username:application_password');
  console.error('   Example: admin:xxxx xxxx xxxx xxxx xxxx xxxx');
  process.exit(1);
}

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const WC_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const WC_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;
const WP_REST_API = process.env.WORDPRESS_REST_API;

const colonIndex = WP_REST_API.indexOf(':');
if (colonIndex === -1) {
  console.error('❌ ERROR: WORDPRESS_REST_API must be in format: username:application_password');
  console.error('   Current format appears to be missing the colon separator');
  console.error('   Example: admin:xxxx xxxx xxxx xxxx xxxx xxxx');
  console.error('   Make sure to include both WordPress username AND application password separated by a colon');
  process.exit(1);
}

const WP_USERNAME = WP_REST_API.substring(0, colonIndex);
const WP_APP_PASSWORD = WP_REST_API.substring(colonIndex + 1);

if (!WP_USERNAME || !WP_APP_PASSWORD) {
  console.error('❌ ERROR: WORDPRESS_REST_API must be in format: username:application_password');
  console.error(`   Parsed username: "${WP_USERNAME || '(empty)'}"`);
  console.error(`   Parsed password: "${WP_APP_PASSWORD ? '(present)' : '(empty)'}"`);
  process.exit(1);
}

// WordPress media upload endpoint
const MEDIA_API_URL = `${WOOCOMMERCE_URL}/wp-json/wp/v2/media`;
// WooCommerce products endpoint
const PRODUCTS_API_URL = `${WOOCOMMERCE_URL}/wp-json/wc/v3/products`;

interface FrameData {
  Name: string;
  Code: string;
  Variation_Exists?: string;
  Variation_Code?: string;
  Shape?: string;
  Gender?: string;
  Material?: string;
  Size?: string;
  Color?: string;
}

interface UploadResult {
  folder: string;
  status: 'success' | 'skipped' | 'failed';
  message: string;
  productId?: number;
}

async function getImageFiles(folderPath: string): Promise<string[]> {
  const files = await fs.readdir(folderPath);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  // Only get images with _nobg in the name
  return files.filter(file => 
    imageExtensions.some(ext => file.toLowerCase().endsWith(ext)) &&
    file.includes('_nobg')
  );
}

async function parseCSV(csvPath: string): Promise<FrameData | null> {
  try {
    const content = await fs.readFile(csvPath, 'utf-8');
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    
    if (records.length === 0) return null;
    
    return records[0] as FrameData;
  } catch {
    return null;
  }
}

async function uploadImageToWordPress(imagePath: string): Promise<string | null> {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const fileName = path.basename(imagePath);
    
    // Create form data for WordPress media upload
    const formData = new FormData();
    formData.append('file', imageBuffer, fileName);
    
    // Configure axios with WordPress REST API credentials
    const axiosConfig: any = {
      auth: {
        username: WP_USERNAME,
        password: WP_APP_PASSWORD
      },
      headers: {
        ...formData.getHeaders()
      }
    };
    
    const response = await axios.post(MEDIA_API_URL, formData, axiosConfig);
    
    console.log(`     ✅ Image uploaded to media library (ID: ${response.data.id})`);
    return response.data.source_url;
  } catch (error) {
    console.error(`  ❌ Failed to upload image: ${path.basename(imagePath)}`);
    if (axios.isAxiosError(error)) {
      console.error(`     Status: ${error.response?.status}`);
      console.error(`     Message: ${JSON.stringify(error.response?.data)}`);
      if (error.response?.status === 401) {
        console.error(`     Authentication failed. Please check WORDPRESS_REST_API credentials.`);
      }
    }
    return null;
  }
}

async function createWooCommerceProduct(frameData: FrameData, images: { url: string }[]): Promise<number | null> {
  try {
    const productData: any = {
      name: frameData.Name,
      sku: frameData.Code,
      type: 'simple',
      status: 'publish',
      description: `${frameData.Shape || ''} ${frameData.Material || ''} frame in ${frameData.Color || 'various colors'}`.trim(),
      short_description: frameData.Name,
      categories: [
        {
          name: 'Frames'
        }
      ],
      images: images.map(img => ({
        src: img.url
      })),
      meta_data: []
    };
    
    // Add custom fields from CSV
    if (frameData.Shape) {
      productData.meta_data.push({
        key: 'shape',
        value: frameData.Shape
      });
    }
    
    if (frameData.Gender) {
      productData.meta_data.push({
        key: 'gender',
        value: frameData.Gender
      });
    }
    
    if (frameData.Material) {
      productData.meta_data.push({
        key: 'material',
        value: frameData.Material
      });
    }
    
    if (frameData.Size) {
      productData.meta_data.push({
        key: 'size',
        value: frameData.Size
      });
    }
    
    if (frameData.Color) {
      productData.meta_data.push({
        key: 'color',
        value: frameData.Color
      });
    }
    
    // Configure axios with WooCommerce credentials
    const axiosConfig: any = {
      auth: {
        username: WC_KEY,
        password: WC_SECRET
      }
    };
    
    const response = await axios.post(PRODUCTS_API_URL, productData, axiosConfig);
    
    return response.data.id;
  } catch (error) {
    console.error(`  ❌ Failed to create WooCommerce product`);
    if (axios.isAxiosError(error)) {
      console.error(`     Error: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
    }
    return null;
  }
}

async function processFolder(folderPath: string, folderName: string): Promise<UploadResult> {
  try {
    console.log(`\n📂 Processing: ${folderName}`);
    
    // 1. Read CSV file
    const csvPath = path.join(folderPath, `${folderName}.csv`);
    const frameData = await parseCSV(csvPath);
    
    if (!frameData) {
      return {
        folder: folderName,
        status: 'failed',
        message: 'CSV file not found or invalid'
      };
    }
    
    console.log(`  📄 CSV Data:`);
    console.log(`     Name: ${frameData.Name}`);
    console.log(`     Code: ${frameData.Code}`);
    console.log(`     Shape: ${frameData.Shape || 'N/A'}`);
    console.log(`     Gender: ${frameData.Gender || 'N/A'}`);
    console.log(`     Material: ${frameData.Material || 'N/A'}`);
    console.log(`     Size: ${frameData.Size || 'N/A'}`);
    console.log(`     Color: ${frameData.Color || 'N/A'}`);
    
    // 2. Get _nobg images
    const imageFiles = await getImageFiles(folderPath);
    
    if (imageFiles.length === 0) {
      return {
        folder: folderName,
        status: 'skipped',
        message: 'No images with _nobg suffix found'
      };
    }
    
    console.log(`  📸 Found ${imageFiles.length} background-removed image(s)`);
    
    // 3. Upload images to WordPress Media Library
    const imageUrls: { url: string }[] = [];
    
    console.log(`  ⬆️  Uploading images to WordPress...`);
    for (const imageFile of imageFiles) {
      const imagePath = path.join(folderPath, imageFile);
      try {
        const imageUrl = await uploadImageToWordPress(imagePath);
        if (imageUrl) {
          imageUrls.push({ url: imageUrl });
          console.log(`  ✅ Uploaded: ${imageFile} -> ${imageUrl}`);
        }
      } catch (error) {
        console.error(`  ❌ Failed to upload: ${imageFile}`);
      }
      
      // Small delay between uploads to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    if (imageUrls.length === 0) {
      return {
        folder: folderName,
        status: 'failed',
        message: 'Failed to upload images to WordPress'
      };
    }
    
    // 4. Create WooCommerce product
    console.log(`  🛍️  Creating WooCommerce product...`);
    const productId = await createWooCommerceProduct(frameData, imageUrls);
    
    if (!productId) {
      return {
        folder: folderName,
        status: 'failed',
        message: 'Failed to create WooCommerce product'
      };
    }
    
    console.log(`  ✅ Product created successfully (ID: ${productId})`);
    
    return {
      folder: folderName,
      status: 'success',
      message: `Product created with ${imageUrls.length} image(s)`,
      productId
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
    
    // Check if it's a single folder or parent folder
    const csvFiles = (await fs.readdir(framesDir)).filter(f => f.endsWith('.csv'));
    const isSingleFolder = csvFiles.length > 0;
    
    let results: UploadResult[] = [];
    
    if (isSingleFolder) {
      // Single folder mode
      console.log(`\n🔄 Processing single folder: ${path.basename(framesDir)}\n`);
      const result = await processFolder(framesDir, path.basename(framesDir));
      results.push(result);
    } else {
      // Multiple folders mode
      const entries = await fs.readdir(framesDir, { withFileTypes: true });
      const subfolders = entries.filter(entry => entry.isDirectory());
      
      if (subfolders.length === 0) {
        console.log('No subfolders found in the directory');
        return;
      }
      
      console.log(`\n📦 Found ${subfolders.length} frame folders to process\n`);
      
      for (let i = 0; i < subfolders.length; i++) {
        const folder = subfolders[i];
        const folderPath = path.join(framesDir, folder.name);
        
        console.log(`\n[${ i + 1}/${subfolders.length}] ${folder.name}`);
        
        const result = await processFolder(folderPath, folder.name);
        results.push(result);
        
        // Delay between processing folders
        if (i < subfolders.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    // Summary
    const successful = results.filter(r => r.status === 'success').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Upload Summary:');
    console.log(`   ✅ Successful: ${successful}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log('='.repeat(60));
    
    if (successful > 0) {
      console.log('\n✅ Products uploaded successfully!');
      console.log(`   View products: ${WOOCOMMERCE_URL}/wp-admin/edit.php?post_type=product`);
    }
    
  } catch (error) {
    console.error('Error processing frames:', error);
    throw error;
  }
}

const framesDir = process.argv[2] || './client/public/Frames';

console.log('='.repeat(60));
console.log('WooCommerce Product Uploader');
console.log('='.repeat(60));
console.log(`Target: ${WOOCOMMERCE_URL}`);
console.log(`Processing: ${framesDir}\n`);

processAllFrames(framesDir)
  .then(() => {
    console.log('\n✅ Processing complete!');
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
