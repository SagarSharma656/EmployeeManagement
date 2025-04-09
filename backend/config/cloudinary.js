import cloudinary from 'cloudinary'
import dotenv from "dotenv"
dotenv.config();

export const connectToCloudinary = () => {
    try {
        
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    console.log("Cloudinary connected successfully!");

    } catch (error) {
        console.log(`Error in connect to cloudinary : ${error}`)
    }
}
