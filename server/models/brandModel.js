import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating Brand Schema
/////////////////////////////////////////////////

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A brand must have a name"],
      unique: true,
      trim: true,
    },
    brandLogo: {
      type: String,
      required: [true, "A brand must have a brand image"],
    },
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

// THIS GETS ALL THE MODELS UNDER THE BRAND
brandSchema.virtual("models", {
  ref: "Bike",
  foreignField: "brand",
  localField: "_id",
});

// THIS GETS ALL THE PRODUCTS UNDER THE BRAND
brandSchema.virtual("products", {
  ref: "Product",
  foreignField: "brand",
  localField: "_id",
});

brandSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    replacement: "-",
    lower: true,
    trim: true,
  });
  next();
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
