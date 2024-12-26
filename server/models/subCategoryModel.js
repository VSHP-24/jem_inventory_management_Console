import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating SubCategory Schema
/////////////////////////////////////////////////

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A subCategory must have a name"],
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "A subCategory must have a category"],
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

// THIS GETS ALL THE PRODUCTS UNDER SPECIFIC SUBCATEGORY
subCategorySchema.virtual("products", {
  ref: "Product",
  foreignField: "subCategory",
  localField: "_id",
});

subCategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
