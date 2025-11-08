import { promises as fs } from 'fs';
import FormData from 'form-data';
import axios from 'axios';

if (!process.env.WOOCOMMERCE_URL) {
  console.error('❌ ERROR: WOOCOMMERCE_URL environment variable is not set.');
  process.exit(1);
}

if (!process.env.WORDPRESS_REST_API) {
  console.error('❌ ERROR: WORDPRESS_REST_API environment variable is not set.');
  process.exit(1);
}

const WOOCOMMERCE_URL = process.env.WOOCOMMERCE_URL;
const WP_REST_API = process.env.WORDPRESS_REST_API;

const colonIndex = WP_REST_API.indexOf(':');
if (colonIndex === -1) {
  console.error('❌ ERROR: WORDPRESS_REST_API must be in format: username:application_password');
  process.exit(1);
}

const WP_USERNAME = WP_REST_API.substring(0, colonIndex);
const WP_APP_PASSWORD = WP_REST_API.substring(colonIndex + 1);

const MEDIA_API_URL = `${WOOCOMMERCE_URL}/wp-json/wp/v2/media`;

async function testImageUpload(imagePath: string): Promise<void> {
  console.log('='.repeat(60));
  console.log('WordPress Media Upload Test');
  console.log('='.repeat(60));
  console.log(`Target: ${WOOCOMMERCE_URL}`);
  console.log(`Image: ${imagePath}\n`);

  // Test authentication first
  console.log('🔍 Testing WordPress REST API authentication...');
  console.log(`   Username: "${WP_USERNAME}"`);
  console.log(`   Password length: ${WP_APP_PASSWORD.length} characters`);
  
  try {
    const testUrl = `${WOOCOMMERCE_URL}/wp-json/wp/v2/users/me`;
    const cleanPassword = WP_APP_PASSWORD.replace(/\s/g, '');
    const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${cleanPassword}`).toString('base64');
    
    const testConfig: any = {
      headers: {
        'Authorization': authHeader
      }
    };
    
    console.log(`   Testing WITHOUT LocalWP layer first...`);
    
    const testResponse = await axios.get(testUrl, testConfig);
    console.log(`✅ Authentication successful!`);
    console.log(`   User: ${testResponse.data.name} (${testResponse.data.username})`);
    console.log(`   Roles: ${testResponse.data.roles.join(', ')}\n`);
  } catch (error: any) {
    console.error(`❌ Authentication failed: ${error.response?.status}`);
    if (error.response?.data) {
      console.error(`   Error: ${JSON.stringify(error.response.data)}`);
    }
    if (error.response?.headers) {
      console.error(`   Response headers: ${JSON.stringify(error.response.headers)}`);
    }
    console.error(`\n   ⚠️  Please verify in WordPress:`);
    console.error(`   1. Go to https://spiritual-cellar.localsite.io/wp-admin/users.php`);
    console.error(`   2. Find your user and verify the exact username (hover over the name)`);
    console.error(`   3. Make sure it matches "${WP_USERNAME}" exactly (case-sensitive)`);
    console.error(`   4. Go to Users → Profile → Application Passwords`);
    console.error(`   5. Delete old passwords and create a fresh one`);
    console.error(`   6. Update WORDPRESS_REST_API secret as: username:new_password`);
    process.exit(1);
  }

  // Upload image
  console.log('⬆️  Uploading image to WordPress media library...');
  
  try {
    const imageBuffer = await fs.readFile(imagePath);
    const fileName = imagePath.split('/').pop() || 'image.png';
    
    const formData = new FormData();
    formData.append('file', imageBuffer, fileName);
    
    const cleanPassword = WP_APP_PASSWORD.replace(/\s/g, '');
    const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${cleanPassword}`).toString('base64');
    
    const uploadConfig: any = {
      headers: {
        ...formData.getHeaders(),
        'Authorization': authHeader
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    };
    
    const response = await axios.post(MEDIA_API_URL, formData, uploadConfig);
    
    console.log('✅ Image uploaded successfully!');
    console.log(`   Media ID: ${response.data.id}`);
    console.log(`   Title: ${response.data.title.rendered}`);
    console.log(`   URL: ${response.data.source_url}`);
    console.log(`   File: ${response.data.media_details.file}`);
    console.log(`   Size: ${Math.round(response.data.media_details.filesize / 1024)}KB`);
    console.log('\n✅ Test completed successfully!');
    
  } catch (error: any) {
    console.error('❌ Image upload failed');
    if (axios.isAxiosError(error)) {
      console.error(`   Status: ${error.response?.status}`);
      if (error.response?.data && typeof error.response.data === 'object') {
        console.error(`   Error: ${JSON.stringify(error.response.data)}`);
      }
    } else {
      console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    process.exit(1);
  }
}

// Test with one of the BAKER images
const testImagePath = process.argv[2] || 'client/public/Frames/BAKER/Angled_nobg.png';
testImageUpload(testImagePath);
