import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./db/connect.js";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import morgan from "morgan"
// CONSTANTS
dotenv.config();
const PORT = process.env.PORT || 5001;
const DBURI = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017';
const app = express();

//CORS  OPTIONS
const corsOptions ={
    origin:'http://localhost:3000', 
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
app.all('*', function(req, res){
    res.status(404).send('failed');
  });

// SERVER
connectDB(DBURI);
app.listen(PORT,()=>{
    console.log("listening on port",PORT);
})