import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating Bike Schema
/////////////////////////////////////////////////

const bikeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  version: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    trim: true,
  },
  bikeImage: {
    type: String,
    required: [true, "A bike must have an image"],
  },
  description: {
    type: String,
    trim: true,
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

export default Bike;
