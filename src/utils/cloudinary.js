import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export default cloudinary;


export const uploadImage = async (filePath) => {
  try {

    
    // Check if the file exists before uploading
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
    }


    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Tip_App", // Optional: specify a folder in Cloudinary
    });

    // Remove the file after uploading to Cloudinary
    try {
      fs.unlinkSync(filePath);
      console.log(`Successfully deleted temp file: ${filePath}`);
    } catch (deleteError) {
      console.error(`Failed to delete temp file ${filePath}:`, deleteError);
      // Continue execution even if deletion fails
    }

    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result; // Return the result of the deletion
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error; // Rethrow the error for further handling if needed
  }
}