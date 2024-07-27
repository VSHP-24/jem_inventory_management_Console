import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating Brand Schema
/////////////////////////////////////////////////

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  brandLogo: {
    type: String,
    required: [true, "A brand must have a brand image"],
  },
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
