import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating Brand Schema
/////////////////////////////////////////////////

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brandLogo: {
      type: String,
      required: [true, "A brand must have a brand image"],
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

brandSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "brand",
});

brandSchema.virtual("models", {
  ref: "Bike",
  localField: "_id",
  foreignField: "brand",
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
