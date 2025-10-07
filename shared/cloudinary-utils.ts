import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary - support both individual secrets and CLOUDINARY_URL format
function configureCloudinary() {
  // Check if CLOUDINARY_URL is provided (format: cloudinary://api_key:api_secret@cloud_name)
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config(process.env.CLOUDINARY_URL);
  } 
  // Otherwise use individual environment variables
  else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  // Check if CLOUDINARY_API is the API Secret (legacy format)
  else if (process.env.CLOUDINARY_API && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API,
    });
  }
}

configureCloudinary();

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  original_filename: string;
  format: string;
  width: number;
  height: number;
}

export async function uploadImageToCloudinary(
  imagePath: string,
  folder: string = 'optiquelens'
): Promise<CloudinaryUploadResult> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.');
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folder,
      resource_type: 'auto',
      use_filename: true,
      unique_filename: false,
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      original_filename: result.original_filename || path.basename(imagePath),
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error(`Error uploading image ${imagePath} to Cloudinary:`, error);
    throw error;
  }
}

export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string,
  folder: string = 'optiquelens'
): Promise<CloudinaryUploadResult> {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          public_id: filename,
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({
              public_id: result.public_id,
              secure_url: result.secure_url,
              original_filename: filename,
              format: result.format,
              width: result.width,
              height: result.height,
            });
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error(`Error uploading buffer to Cloudinary:`, error);
    throw error;
  }
}

export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error(`Error deleting image ${publicId} from Cloudinary:`, error);
    throw error;
  }
}

export function getCloudinaryUrl(publicId: string, transformations?: any): string {
  return cloudinary.url(publicId, transformations);
}
