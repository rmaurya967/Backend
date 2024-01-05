import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY, 
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error("File Path not available");
        }

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error("File not found");
        }

        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });

        fs.unlinkSync(filePath);

        // console.log("File uploaded successfully", response.url);
        return response;
    } catch (error) {
        // Handle the error, log it, and remove the file if it exists
        console.error("Error uploading file:", error.message);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("File has been removed from the local server");
        }

        // Rethrow the error to let the calling function handle it
        throw error;
    }
};

export { uploadOnCloudinary };
