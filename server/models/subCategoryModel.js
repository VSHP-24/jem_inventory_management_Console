import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating SubCategory Schema
/////////////////////////////////////////////////

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

subCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
