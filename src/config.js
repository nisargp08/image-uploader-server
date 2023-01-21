import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { access, constants, mkdir } from "fs";
import path from "path";
import mongoose from "mongoose";
require("dotenv").config();

// Mongodb and host url config
let db_url;
export let host_url;
if (process.env.NODE_ENV === "production") {
  db_url = process.env.PROD_DB_URL;
  host_url = `https://np-image-uploader.up.railway.app/api/file_upload`;
} else {
  db_url = process.env.DEV_DB_URL;
  host_url = `http://localhost:3000/api/file_upload`;
}

// Mongo db server connect
export const connectDB = (url = db_url, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

// Multer storage config
export const uploadDirectory = path.resolve(__dirname, "..", "public/uploads");
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // mkdirSync(uploadDirectory, { recursive: true });
    access(uploadDirectory, constants.F_OK ,(err) => {
      // Directory does not exist
      if (err) {
        // Create a directory
        mkdir(uploadDirectory, { recursive : true }, (error) => {
        //   Send error to callback function
          cb(error, uploadDirectory);
        });
      } else{
          cb(null, uploadDirectory);
      }
    });
  },
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Init upload
export const upload = multer({
  storage: storage,
}).array("fileUpload", 10);

// Status code for Http requestes
export const code = {
  ok: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
};
