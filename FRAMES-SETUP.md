# Frame CSV Generator - Setup & Usage Guide

## Overview

This tool automatically generates CSV files for eyeglass frames using AI-powered image analysis through Google's Gemini API.

## How to Use

### Step 1: Upload Your FRAMES Folder

Create a `FRAMES` directory in the project root with your frame images organized like this:

```
FRAMES/
├── aviator-gold/
│   ├── front.jpg
│   ├── side.jpg
│   └── detail.jpg
├── wayfarer-black/
│   ├── image1.jpg
│   └── image2.jpg
└── round-tortoise/
    ├── photo1.jpg
    └── photo2.jpg
```

**Important**: 
- Each subfolder represents one frame model
- Put all images for that frame inside its subfolder
- Supported formats: .jpg, .jpeg, .png, .webp, .gif

### Step 2: Run Method 1 - Create Base CSVs

First, create the base CSV files:

```bash
tsx scripts/method1-create-csvs.ts client/public/Frames
```

This creates CSV files with default values. It's fast and doesn't use AI.

### Step 3: Run Method 2 - Enrich with AI

Then, enrich the CSVs with AI-generated data:

```bash
tsx scripts/method2-enrich-with-gemini.ts client/public/Frames
```

**What it does:**
1. Scans all folders to find which CSVs need enrichment (empty Color field)
2. Shows you exactly how many need processing
3. Processes them one by one with AI analysis
4. Automatically resumes if you run it again (skips already-enriched frames)

**Optional**: Adjust the API rate limit delay (default: 7000ms):

```bash
API_DELAY_MS=10000 tsx scripts/method2-enrich-with-gemini.ts client/public/Frames
```

### Step 4: Review the Generated CSVs

The script will create a CSV file in each frame subfolder:

```
FRAMES/
├── aviator-gold/
│   ├── front.jpg
│   ├── side.jpg
│   └── aviator-gold.csv  ← Generated CSV
└── wayfarer-black/
    ├── image1.jpg
    ├── image2.jpg
    └── wayfarer-black.csv  ← Generated CSV
```

## CSV Structure

Each CSV contains these columns:

| Column | Description | Example |
|--------|-------------|---------|
| **Name** | AI-generated product name | "Aviator Classic Gold" |
| **Code** | AI-generated unique code | "AVC-G001" |
| **Variation_Exists** | Has variations (default: N) | "N" |
| **Variation_Code** | Variation identifier (default: N) | "N" |
| **Size** | Size information (default: N) | "N" |
| **Color** | AI-detected color from images | "Gold with Brown Gradient" |

## What the AI Does

The Gemini 2.0 Flash AI analyzes your frame images and generates:

1. **Creative Product Name**: Based on the frame's style, shape, and aesthetic
2. **Unique Product Code**: A 6-8 character alphanumeric identifier
3. **Color Description**: Accurate color analysis from the images

## Example Output

**Input**: Folder named `classic-aviator` with 3 images

**Output CSV** (`classic-aviator.csv`):
```csv
Name,Code,Variation_Exists,Variation_Code,Size,Color
Aviator Classic Collection,AVCLC01,N,N,N,Gold Frame with Brown Gradient Lenses
```

## Features

✅ **Batch Processing**: Handles multiple frames automatically  
✅ **AI-Powered**: Uses Gemini 2.0 Flash for fast, accurate analysis  
✅ **Smart Resume**: Automatically skips already-enriched frames  
✅ **Smart Fallbacks**: Uses folder name if AI analysis fails  
✅ **Progress Tracking**: Shows real-time processing status  
✅ **Rate Limiting**: Respects API quotas with automatic delays  
✅ **Error Handling**: Continues processing even if one frame fails  

## Troubleshooting

### "No images found"
- Check that your subfolders contain image files
- Verify file extensions are supported (.jpg, .jpeg, .png, .webp, .gif)

### "API Error"
- Verify your GEMINI_API_KEY is set in Replit secrets
- Check your API quota at [Google AI Studio](https://aistudio.google.com/)

### "Permission denied"
- Ensure the FRAMES directory has write permissions
- Try running with appropriate permissions

## Processing Time

- Small frames (1-3 images): ~2-3 seconds each
- Large frames (5+ images): ~4-5 seconds each
- The script includes automatic delays to prevent API rate limiting

## Next Steps

After generating CSVs, you can:
- Import them into your product database
- Manually review and adjust AI-generated names/codes
- Use the data for your e-commerce platform
- Combine multiple CSVs for bulk imports

---

**Need Help?** Check `scripts/README.md` for additional details.
