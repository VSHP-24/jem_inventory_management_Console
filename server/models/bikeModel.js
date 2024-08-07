import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating Bike Schema
/////////////////////////////////////////////////

const bikeSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    version: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    bikeImage: {
      type: String,
      required: [true, "A bike must have an image"],
    },
    description: {
      type: String,
      trim: true,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

bikeSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "model",
});

bikeSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;
