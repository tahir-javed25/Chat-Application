
import mongoose from "mongoose";


const userSchema =new mongoose.Schema({
    fullName: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    image:{type:String, default:" "},
    password:{type:String, required:true}
},{timestamps:true})

export const User = mongoose.model("User", userSchema) 