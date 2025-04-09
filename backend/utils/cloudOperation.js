import dotenv from 'dotenv'
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloud = async (file) => {
    try {
        const options = {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            resource_type: 'auto',
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;

    } catch (error) {
        console.log(`Error in upload image to cloudinary`);
    }
}