import { Message } from "../Model/message.model.js";
import { User } from "../Model/user.model.js"


export const getAllUsers =async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json({
            users:filteredUser,
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message:error.message,
        })
        
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        console.log(messages)
        res.status(200).json({result:messages})
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

export const sendMessages =async(req,res)=>{
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        console.log(text,receiverId,senderId)
    
        let imageUrl;
        if(image){
        const uploadImg= await cloudinary.uploader.upload(image)
            imageUrl= uploadImg.secure_url
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl,
    });

    await newMessage.save();
        
    res.status(201).json({result:newMessage});
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
  

}