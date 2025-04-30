import express from "express";
import fileupload from "express-fileupload";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
import cors from "cors"

import { userRouter } from "./routes/user.route.js";
import { connectDb } from "./lib/db.js";
import { messageRouter } from "./routes/message.route.js";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}

))


app.use(fileupload({
   useTempFiles: true,
    tempFileDir : '/tmp/'
}))


app.use("/user",userRouter)
app.use("/messages",messageRouter)



app.listen(PORT, ()=>{
    console.log(`yes server is running at http://localhost:${PORT}`)
    connectDb();
})
