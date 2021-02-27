//imports
import express from "express";
import mongoose from 'mongoose';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import {authRoute} from './routes/auth.js';
import { prodRoute } from "./routes/productRoute.js";

//config the env
dotenv.config(); 

//app config
const app = express();

const port = process.env.PORT || 9000;

//middleware

//parse body as json
app.use(express.json());

//parse the jwt token cookies as object
app.use(cookieParser());

//setting headers
app.use(cors());

//db config
mongoose.connect(process.env.DB_CONNECT,{
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology: true
});

//Router middleware
app.use('/users', authRoute);

app.use('/products', prodRoute);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static assets
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
//listen
app.listen(port, ()=> console.log(`listening to ${port}`));
 