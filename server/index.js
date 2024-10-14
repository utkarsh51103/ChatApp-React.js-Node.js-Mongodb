import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authroute from './routes/AuthRoute.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET','POST','PUT','PATCH','DELETE'],
    credentials: true
}))

app.use("uploads/profiles",express.static("uploads/profiles"))

app.use(cookieParser())
app.use(express.json());

app.use('/api/auth',authroute)

const port = process.env.PORT || 5002;
const database = process.env.MONGODB_CONNECTION;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

mongoose.connect(database)
.then(()=>console.log('Connected to database'))
.catch((err)=>console.log(err))