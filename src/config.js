import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from 'path';
import mongoose from "mongoose";
require("dotenv").config();

// Mongodb config
let db_url;
if(process.env.NODE_ENV === "production"){
    db_url = process.env.PROD_DB_URL;
} else {
    db_url = process.env.DEV_DB_URL;
}

// Mongo db server connect
export const connectDB = (url = db_url, opts = {}) => {
    return mongoose.connect(url,{ ...opts,useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false });
}

// Multer storage config
export const uploadDirectory = path.resolve(__dirname,'..','public/uploads');
export const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,uploadDirectory);
    },
    filename : (req,file,cb) => {
        const fileName = `${uuidv4()}-${file.originalname}`;
        cb(null,fileName);
    }
})

// Init upload
export const upload = multer({
    storage : storage
}).any('fileUpload');

// Status code for Http requestes
export const code = {
    'ok' : 200,
    'created' : 201,
    'badRequest' : 400,
    'notFound' : 404,
}
