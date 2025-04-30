import jwt from 'jsonwebtoken';
import { User } from '../Model/user.model.js';


export const protectRoute = async(req,res,next)=>{
// we have two way to store the token one is storing it in cookies and the other is storing it in header and local storage
    // const authToken = req.headers.authorization?.split(' ')[1];
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ message: 'No token provided, authorization denied.' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if(!decode){
            res.status(401).json({
                message:"Porblem with the authorization"
            })
        }

        const user = await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = user;

        next();

    } catch (error) {
        console.log("error in protectRoute", error.message)
        return res.status(500).json({
            message:error.message
        })
    }
   
}
