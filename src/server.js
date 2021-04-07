// Library import
import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
// Route import
import fileUploadRouter from './resources/file_upload/file_upload.router';

const app = express();

// To disable 'x-powered-by' property in our response
app.disable("x-powered-by");

// Middlewares
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.get('/',(req,res) => {
    console.log("welcome to image uiploader");
    res.send("Welcome to image uploader");
})
app.use('/api/file_upload/',fileUploadRouter);

export const startServer = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is live and listening on ${port}`);
  });
};
