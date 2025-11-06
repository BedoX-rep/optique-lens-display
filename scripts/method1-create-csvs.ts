import { promises as fs } from 'fs';
import path from 'path';

interface FrameData {
  Name: string;
  Code: string;
  Variation_Exists: string;
  Variation_Code: string;
  Size: string;
  Color: string;
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

async function createBaseCSVs(framesDir: string) {
  try {
    const entries = await fs.readdir(framesDir, { withFileTypes: true });
    const subfolders = entries.filter(entry => entry.isDirectory());
    
    if (subfolders.length === 0) {
      console.log('No subfolders found in frames directory');
      return;
    }
    
    console.log(`Found ${subfolders.length} frame folders to process`);
    let created = 0;
    let skipped = 0;
    
    for (const folder of subfolders) {
      const folderPath = path.join(framesDir, folder.name);
      const csvPath = path.join(folderPath, `${folder.name}.csv`);
      
      try {
        await fs.access(csvPath);
        console.log(`⊘ Skipped ${folder.name} - CSV already exists`);
        skipped++;
        continue;
      } catch {
        // CSV doesn't exist, create it
      }
      
      const frameData: FrameData = {
        Name: folder.name,
        Code: folder.name.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
        Variation_Exists: 'N',
        Variation_Code: 'N',
        Size: 'N',
        Color: 'To be determined'
      };
      
      const csvContent = createCSVContent(frameData);
      await fs.writeFile(csvPath, csvContent, 'utf-8');
      console.log(`✓ Created: ${folder.name}.csv`);
      created++;
    }
    
    console.log(`\n✅ Method 1 Complete!`);
    console.log(`   Created: ${created} CSVs`);
    console.log(`   Skipped: ${skipped} (already existed)`);
    
  } catch (error) {
    console.error('Error creating CSVs:', error);
    throw error;
  }
}

const framesDir = process.argv[2] || './client/public/Frames';

console.log('='.repeat(60));
console.log('METHOD 1: Base CSV Creation');
console.log('='.repeat(60));
console.log(`Processing directory: ${framesDir}\n`);

createBaseCSVs(framesDir)
  .then(() => {
    console.log('\n' + '='.repeat(60));
  })
  .catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
