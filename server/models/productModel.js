import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating PRODUCT Schema
/////////////////////////////////////////////////

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: [true, "A product must have a brand"],
    },
    model: {
      type: mongoose.Schema.ObjectId,
      ref: "Bike",
      required: [true, "A product must have a bike model"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "A product must have a category"],
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
      required: [true, "A product must have a subcategory"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    discountPrice: {
      type: Number,
    },
    size: String,
    mainImage: {
      type: String,
      required: [true, "A product must have an image"],
    },
    additionalImages: [String],
    descriptions: [{ type: String, trim: true }],
    includedParts: [
      {
        quantity: Number,
        part: {
          type: mongoose.Schema.ObjectId,
          ref: "Part",
        },
      },
    ],
    additionalInformations: [{ type: String, trim: true }],
    video: String,
    slug: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
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
