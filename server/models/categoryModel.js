import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating Category Schema
/////////////////////////////////////////////////

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
