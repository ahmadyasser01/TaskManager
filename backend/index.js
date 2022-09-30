import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import morgan from "morgan"
import path from 'path'
// CONSTANTS
dotenv.config();
const PORT = process.env.PORT || 5001;
const DBURI = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017';
const app = express();
// to enable cookies
app.enable('trust proxy');
//CORS  OPTIONS

const corsOptions ={
    origin:/https:\/\/(.+).vercel.app/, 
    credentials:true,            //access-control-allow-credentials:true
}

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'))

//ROUTES
app.use('/api/users',userRouter);
app.use('/api/tasks',taskRouter)
// app.all('*', function(req, res){
//     res.status(404).send(process.env.FRONT_URL);
//   });

// SERVER
connectDB(DBURI);
app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})