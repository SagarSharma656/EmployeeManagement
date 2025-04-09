import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/database.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {connectToCloudinary} from './config/cloudinary.js';
import fileUpload from 'express-fileupload';

import authRoutes from './Routes/authRoute.js'
import employeeRoutes from './Routes/employeeRoute.js'


const app = express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,  
    tempFileDir: '/tmp/',
}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true
}))


app.listen(process.env.PORT, () => {
    console.log(`Backend start on port: ${process.env.PORT}`)
})

connectDB();
connectToCloudinary();

app.use('/auth', authRoutes)
app.use('/employee', employeeRoutes)


app.get('/', (req, res) => {
    res.send(
        `<h1>Server Running on Port : ${process.env.PORT}</h1>`
    )
})