/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "req|res|next|val" }]*/

import Part from "./../models/partModel.js";

/////////////////////////////////////////////////
//           FETCHES ALL THE PARTS
/////////////////////////////////////////////////

export async function getAllParts(req, res) {
  try {
    const parts = await Part.find();
    res.status(200).json({
      status: "success",
      results: parts.length,
      data: {
        parts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           FETCHES SPECIFIC PART
/////////////////////////////////////////////////

export async function getPart(req, res) {
  try {
    const part = await Part.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        part,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           CREATE NEW PART
/////////////////////////////////////////////////

export async function createPart(req, res) {
  try {
    const part = await Part.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        part,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           UPDATE SPECIFIC PART
/////////////////////////////////////////////////

export async function updatePart(req, res) {
  try {
    const part = await Part.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { part },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

/////////////////////////////////////////////////
//           DELETE SPECIFIC PART
/////////////////////////////////////////////////

export async function deletePart(req, res) {
  try {
    await Part.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}
