import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        enum: ["HR", "Manager", "Sales"],
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        required: true,
        default: "employee"
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],   
        required: true
    },
    course: {
        type: [String],
        enum: ["B.Tech", "MCA", "BCA", "BSC"],
        required: true
    },
    imageUrl: {
        type: String,
    }
}, {timestamps: true})


export default mongoose.model("Employee", employeeSchema);