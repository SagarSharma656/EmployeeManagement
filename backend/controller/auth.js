
import Employee from '../model/Employee.js'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import bcrypt from 'bcrypt'



const login = async (req, res) => {
    try {
        const { email, password } = req?.body;

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Fill all mandatory fields"
            });
        }


        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(401).json({
                success: false,
                message: "Employee not Registered",
            });
        }

        if (!await bcrypt.compare(password, employee.password)) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const payload = {
            id: employee._id,
            email: employee.email,
            role: employee.role,
            designation: employee.designation
        }

        const token = JWT.sign(payload, process.env.JWTSECRET, {
            expiresIn: "7d"
        });

        // console.log(token , "token")

        const cookieOptions = {
            path: '/',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }

        employee.password = null;

        return res.cookie('token', token, cookieOptions).status(200).json({
            success: true,
            message: "Login Successful",
            token,
            employee
        });
    } catch (error) {
        console.log(`Error in login : ${error}`);

        return res.status(500).json({
            success: false,
            message: `Server Error  : ${error.message}`
        });
    }

}


const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong during logout",
        });
    }
};



export { login, logout }