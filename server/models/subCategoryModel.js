import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating SubCategory Schema
/////////////////////////////////////////////////

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: String,
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
