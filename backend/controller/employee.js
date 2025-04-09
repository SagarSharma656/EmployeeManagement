import Employee from '../model/Employee.js'
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from "bcrypt"
import { uploadToCloud } from '../utils/cloudOperation.js';
import { validateEmail, validateMobile } from '../utils/helperFunctions.js';


const create = async (req, res) => {
    try {
        const { employeeId, name, email, password, mobile, designation, gender, course } = req?.body;
        const image = req?.files?.image;


        if (
            !employeeId ||
            !name ||
            !email ||
            !password ||
            !mobile ||
            !designation ||
            !gender ||
            !course
        ) {
            return res.status(400).json({
                success: false,
                message: "Fill all Mandatory fields"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email Id"
                })
        }

        if (!validateMobile(mobile)) {
            return res.status(400).json({
                success: false,
                message: "Invalid mobile number"
            })
        }

        const checkEmployeeByEmail = await Employee.findOne({ email });
        if (checkEmployeeByEmail) {
            return res.status(400).json({
                success: false,
                message: "This Email already registered"
            })
        }

        const checkEmployeeById = await Employee.findOne({ employeeId });
        if (checkEmployeeById) {
            return res.status(400).json({
                success: false,
                message: "This Employee Id already registered"
            })
        }

        let result = '';
        if (image) {
            result = await uploadToCloud(image)
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            employeeId,
            name,
            email,
            password: hashPassword,
            mobile,
            designation,
            gender,
            course,
            imageUrl: result?.secure_url
        })
        await newEmployee.save();

        return res.status(200).json({
            success: true,
            message: "Employee registered successfully"
        })

    } catch (error) {
        console.log(`Error in Employee creation : ${error}`);
        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`,
        });
    }
}

const update = async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const image = req?.files?.image;

        if(!id){
            return res.status(400).json({
                success: false,
                message: "Employee Id Required"
            }) 
        }

        if (body.email && !validateEmail(body.email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email Id"
            })
        }

        if(body.mobile && !validateMobile(body.mobile)){
            return res.status(400).json({
                success: false,
                message: "Invalid mobile number"
            })
        }

        let result = '';
        if (image) {
            result = await uploadToCloud(image)
        }

        body.imageUrl = result?.secure_url


        const updatedEmployee = await Employee.findByIdAndUpdate(id, body, {new: true});

        if(!updatedEmployee){
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Update successfully"
        })

    } catch (error) {
        console.log(`Error in Employee updation : ${error}`);
        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`,
        });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee Id Required"
            })
        }

        await Employee.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Delete successfully"
        })        
    } catch (error) {
        console.log(`Error in Employee updation : ${error}`);
        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`,
        });
    }
}


const getUser = async (req, res) => {
    try {
        const user = req.user;

        const currentUser = await Employee.findById(user?.id);

        if(!currentUser){
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Employee fetch successfully",
            employee: currentUser
        })
    } catch (error) {
        console.log(`Error in fetch single employee : ${error}`);
        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`,
        });
    }
}

const getById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Employee Id Required"
            })
        }

        const employee = await Employee.findById(id, {password: 0})

        if(!employee){
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee fetch successfully",
            employee
        })     

    } catch (error) {
        console.log(`Error in Employee updation : ${error}`);
        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`,
        });
    }
}



const getAll = async (req, res) => {
    try {
        const { pageNo, itemOnPage, search, sortBy } = req.query;

        const page = parseInt(pageNo) || 1;
        const limit = parseInt(itemOnPage) || 10;
        const skip = limit * (page - 1)


        const filter = { role: "employee" };
        if (search) {
            filter.$or = [
                { name: { $regex: search } },
                { email: { $regex: search } }
            ];
        }

        let sortOrder = -1;
        if (sortBy === "oldest") {
            sortOrder = 1;
        }

        const totalEmployees = await Employee.countDocuments(filter);
        const totalPages = Math.ceil(totalEmployees / limit);

        const allEmployees = await Employee.find(filter, {password: 0}).sort({ createdAt: sortOrder }).skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            message: "Employee fetch successfully",
            allEmployees,
            totalPages
        })  

    } catch (error) {
        console.log(`Error in Employee updation : ${error}`);
        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`,
        });
    }
}


export {create, update, deleteEmployee, getUser, getById, getAll};