import mongoose from "mongoose";
import slugify from "slugify";

/////////////////////////////////////////////////
//             Creating Category Schema
/////////////////////////////////////////////////

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A category must have a name"],
      unique: true,
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

// THIS GETS ALL THE SUBCATEGORIES UNDER THE CATEGORY
categorySchema.virtual("subCategories", {
  ref: "SubCategory",
  foreignField: "category",
  localField: "_id",
});

// THIS GETS ALL THE PRODUCTS UNDER THE CATEGORY
categorySchema.virtual("products", {
  ref: "Product",
  foreignField: "category",
  localField: "_id",
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { replacement: "-", lower: true, trim: true });
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
