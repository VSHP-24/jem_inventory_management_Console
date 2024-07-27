import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating PART Schema
/////////////////////////////////////////////////

const partSchema = new mongoose.Schema({
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
});

const Part = mongoose.model("Part", partSchema);

export default Part;
