// Library import
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import * as config from "./config";
// Route import
import fileUploadRouter from "./resources/file_upload/file_upload.router";

const app = express();

// To disable 'x-powered-by' property in our response
app.disable("x-powered-by");

// Middlewares
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(config.uploadDirectory));

// Routes
app.use("/api/file_upload/", fileUploadRouter);

export const startServer = async () => {
  try {
    await config.connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is live and listening on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
