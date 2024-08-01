import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating PRODUCT Schema
/////////////////////////////////////////////////

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    model: {
      type: mongoose.Schema.ObjectId,
      ref: "Bike",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
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
    includedParts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Part",
      },
    ],
    additionalInformation: String,
    video: String,
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
