import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating PRODUCT Schema
/////////////////////////////////////////////////

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  size: String,
  combo: String,
  mainImage: {
    type: String,
    required: [true, "A product must have an image"],
  },
  additionalImages: [String],
  description: String,
  includedParts: [String],
  additionalInformation: String,
  video: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
