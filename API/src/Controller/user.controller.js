
import {User} from "../Model/user.model.js"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req,res)=>{
    // console.log(req.body);
    // console.log(req.files.image)
    const {fullName, email,password} = req.body;
    // const {image} = req.files;

    try {
        if (!fullName  || !password  || !email){
            return res.status(400).json({message:"Please fill all the fields"})}


        const data = await User.findOne({email});
        // console.log(data);
        if (data){
            return res.status(400).send({message:"Email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
        });
            console.log(newUser);
        if(newUser){
            generateToken(newUser._id,res);
            const savedUser = await newUser.save();
            // console.log(savedUser)
        

         res.status(200).json({
            id:newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            image:newUser.image
            
        })
    }
    else{
        res.status(400).json({message:"Failed to create user"})
    }
    } catch (error) {
      
        console.log("error found",error.message);
        res.status(500).json({message:"Internal server error"})
    }   
}



export const login =async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user){
            res.status(400).json({
                message:"Email not found"
            })
        }

        const isCorrectPassword = await bcrypt.compare(password,user.password);

        if(!isCorrectPassword){
            res.status(400).json({
                message:"Invalid password"
            })
        }
        generateToken(user._id,res);

        res.status(200).json({
            result:user
        })

    } catch (error) {
        console.log("Credentials wrong May be", error.message);
        res.status(500).json({message:"Internal server error".erro.message})
        
    }

}


export const logout = async (req,res)=>{
    try {
        // console.log("Logout function hit");
        
        // res.clearCookie("jwt");
        res.cookie("jwt", "", {
            maxAge: 0,
            sameSite: "strict",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            
            });
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({message:"Internal server error".erro.message})   
    }
   
}


export const update = async (req, res) => {
    try {
        // console.log(req.body)
        // console.log(req.body)
        // console.log(req.body.image)
        const {image} = req.body;
        // console.log(image);
        
        // this req.user._id came from the auth.middleware were we are setting a new request req.user = user
        const userId =  req.user._id;
        // const img = req.user.image;
        // console.log(img);

        if(!image){
            console.log("Please Upload a file first");
        }
        // const deleted = await cloudinary.uploader.destroy(req.user.image);
        // console.log("delete photo is here", deleted);
        
        const uploadedFile = await cloudinary.uploader.upload(image);
    
        const updateProfile = await User.findByIdAndUpdate(
            userId,
            {image:uploadedFile.secure_url},
            {new:true}
        );
    
        res.status(200).json({
            result: updateProfile
        })
    
       
    console.log("File uploaded successfully", uploadedFile.secure_url);

    } catch (error) {
        res.status(500).json({
            message: "file uploading error: " + error.message
        })
        
    }
}
   

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }}