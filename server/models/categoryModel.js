import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating Category Schema
/////////////////////////////////////////////////

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
