# Frame CSV Generator Scripts

These scripts process eyeglass frame images and generate CSV files with AI-powered analysis.

## Prerequisites

1. **FRAMES Directory Structure**: Create a `FRAMES` folder in the project root with the following structure:
   ```
   FRAMES/
   ├── frame-1/
   │   ├── image1.jpg
   │   ├── image2.jpg
   │   └── ...
   ├── frame-2/
   │   ├── image1.jpg
   │   └── ...
   └── ...
   ```

2. **API Key**: Your `GEMINI_API_KEY` is already configured in Replit secrets.

3. **Optional**: Set `API_DELAY_MS` environment variable to adjust rate limiting (default: 1000ms).

## Usage

### Method 1 & 2 Combined: Generate and Enrich CSVs

Run the main script to process all frames:

```bash
tsx scripts/generate-frame-csvs.ts
```

Or with a custom path:

```bash
tsx scripts/generate-frame-csvs.ts ./path/to/FRAMES
```

## What It Does

For each subfolder in `FRAMES/`:

1. **Scans Images**: Finds all image files (.jpg, .jpeg, .png, .webp, .gif)
2. **AI Analysis**: Uses Gemini AI to analyze up to 5 images per frame
3. **Generates Data**:
   - **Name**: AI-generated creative product name
   - **Code**: AI-generated unique product code
   - **Color**: AI-detected color description
   - **Variation_Exists**: Default 'N'
   - **Variation_Code**: Default 'N'
   - **Size**: Default 'N'
4. **Creates CSV**: Saves `[folder-name].csv` in the same subfolder

## Output Example

For a folder named `aviator-classic`:

**File**: `FRAMES/aviator-classic/aviator-classic.csv`

```csv
Name,Code,Variation_Exists,Variation_Code,Size,Color
Aviator Classic Gold,AVC-G001,N,N,N,Gold with Brown Gradient
```

## Features

**Method 1: CSV Creation**
- ✅ Batch creates base CSV files for all frames
- ✅ Skips folders that already have CSVs
- ✅ Sets default values for all required fields

**Method 2: Gemini AI Enrichment**
- ✅ Pre-scans all folders to identify which need processing
- ✅ Smart resume capability - only processes frames with empty Color fields
- ✅ AI-powered name generation
- ✅ Smart product code creation
- ✅ Accurate color detection from images
- ✅ Progress tracking with clear statistics
- ✅ Error handling and fallback values
- ✅ Rate limiting (7s delay) to respect API quotas

## Troubleshooting

**No images found**: Ensure your FRAMES subfolders contain image files with supported extensions.

**API errors**: Check that your GEMINI_API_KEY is valid and has sufficient quota.

**Permission errors**: Ensure the script has write access to the FRAMES directory.
