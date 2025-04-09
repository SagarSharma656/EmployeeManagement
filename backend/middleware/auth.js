import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const auth = async (req, res, next) => {
    try {
        const token = req?.cookies?.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "User not login"
            })
        }

        try {
            const tokenData = JWT.verify(token, process.env.JWTSECRET);
            req.user = tokenData;
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Token not verify try again"
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Server Error: ${error.message}`,
        });
    }
}

const isAdminOrHR = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.role !== 'admin' && user.designation !== "HR") {
            return res.status(400).json({
                success: false,
                message: "This is protected route for Admin or HR"
            });
        }

        next();

    } catch (error) {
        console.log(`Error in check user role and designation : ${error}`)

        return res.status(500).json({
            success: false,
            message: `Error in check user role and designation : ${error}`
        })
    }
}



export { auth, isAdminOrHR }