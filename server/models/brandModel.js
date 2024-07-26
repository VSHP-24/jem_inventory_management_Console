import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating Brand Schema
/////////////////////////////////////////////////

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
