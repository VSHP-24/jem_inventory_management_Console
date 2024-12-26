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
      required: [true, "A bike model must have a brand"],
    },
    name: {
      type: String,
      required: [true, "A bike must have a name"],
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

// THIS GETS ALL THE PRODUCTS UNDER A SPECIFIC BIKE MODEL
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
