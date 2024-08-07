import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating PART Schema
/////////////////////////////////////////////////

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

partSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const Part = mongoose.model("Part", partSchema);

export default Part;
