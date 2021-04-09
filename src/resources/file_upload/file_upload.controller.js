import * as config from "../../config";
import { Image } from "./file_upload.model";
import path from "path";

// Controller function to upload a file
export const uploadFile = (req, res) => {
  // Use multer upload
  config.upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res
        .status(config.code.badRequest)
        .json({ data: `Error occured : ${err}` });
    } else {
      // Get a copy of the files with updated keys
      const images = req.files.map((file) => {
        return {
          size: file.size,
          originalName: file.originalname,
          mimeType: file.mimetype,
          path: file.path,
          generatedFileName: file.filename,
          uploadedAt: new Date(),
        };
      });
      // Store the array in mongoose
      Image.insertMany(images)
        .then((docs) => {
          // Return an array containing image URL's of all the uploaded images
          const imageURLs = docs.map((doc) => {
            return { url: `${config.host_url}/${doc._id}`, name: doc.originalName };
          });
          console.log(imageURLs);
          res.status(config.code.created).json(imageURLs);
        })
        .catch((error) => {
          // If error occured send status code and console log
          console.log(error);
          res.status(config.code.badRequest).end();
        });
    }
  });
};
// Controller function to get a file by id
export const getOne = async (req, res) => {
  try {
    // Find image by it's id
    const doc = await Image.findOne({ _id: req.params.id }).lean().exec();
    // If not found then send not found status
    if (!doc) {
      res.status(config.code.notFound).end();
    }
    // else send the found image as response
    const imageURL = path.join(config.uploadDirectory, doc.generatedFileName);
    res.status(config.code.ok).sendFile(imageURL);
  } catch (error) {
    console.log(error);
    res.status(config.code.badRequest).end();
  }
};
