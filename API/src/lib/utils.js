import jwt from "jsonwebtoken";
import dontenv from "dotenv";

dontenv.config();


export const generateToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d",})


res.cookie("jwt", token, {
    maxAge: 7*24*60*60*1000,
    sameSite: "strict",
    httpOnly:true,
    // secure:false,
    secure: process.env.NODE_ENV !== "development",
    
})

 return token;
}