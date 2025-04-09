import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const connectDB = () => {
    mongoose.connect(process.env.MONGODBURL)
        .then(() => {
            console.log('DB connect');
        }).catch((error) => {
            console.log(`Errr in DB connection : ${error}`);
            process.exit(1);
        })
}

export default connectDB;