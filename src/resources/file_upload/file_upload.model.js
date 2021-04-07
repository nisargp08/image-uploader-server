import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  size: { type: Number },
  originalName: { type: String },
  mimeType: { type: String },
  path: { type: String },
  generatedFileName: { type: String },
  uploadedAt: { type: Date },
});

export const Image = mongoose.model('image',imageSchema);
