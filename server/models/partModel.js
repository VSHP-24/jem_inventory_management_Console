import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating PART Schema
/////////////////////////////////////////////////

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A part must have a name"],
      unique: true,
      trim: true,
    },
    length: Number,
    insideDiameter: Number,
    outsideDiameter: Number,
    threadDiameter: Number,
    threadPitch: Number,
    shankLength: Number,
    headHeight: Number,
    headDiameter: Number,
    allenKeySize: Number,
    width: Number,
    thickness: Number,
    material: String,
    quantity: {
      type: Number,
      default: 0,
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

// THIS GETS ALL THE PRODUCTS WHICH HAS THAT SPECIFIC PART
partSchema.virtual("products", {
  ref: "Product",
  foreignField: "includedParts.part",
  localField: "_id",
});

partSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const Part = mongoose.model("Part", partSchema);

export default Part;
