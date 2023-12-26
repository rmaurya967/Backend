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
            console.log("File Path not availble");
        }
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
        })
        console.log("File uploaded sucessfully ", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log("File has been removed from local server");
    }
}


export { uploadOnCloudinary };