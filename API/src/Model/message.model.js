
import mongoose from "mongoose";
import {User} from "./user.model.js"


const messageSchema =new mongoose.Schema({
    senderId: {type:String, ref:User, required:true},
    receiverId: {type:String,ref:User, required:true,},
    image:{type:String,},
    text:{type:String, }
},{timestamps:true})

export const Message = mongoose.model("Message", messageSchema) 