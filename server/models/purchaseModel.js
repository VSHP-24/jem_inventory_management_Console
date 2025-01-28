import mongoose from "mongoose";

/////////////////////////////////////////////////
//          Creating PURCHASE Schema
/////////////////////////////////////////////////

const purchaseSchema = new mongoose.Schema(
  {
    part: {
      type: mongoose.Schema.ObjectId,
      ref: "Part",
      required: [true, "A purchase must have a part"],
    },
    quantity: {
      type: Number,
      required: [true, "A purchase must have a number of quantities"],
    },
    vendor: {
      type: String,
      required: [true, "A purchase must have a vendor"],
    },
    purchaseCost: {
      type: Number,
      required: [true, "A purchase must have a purchase cost"],
    },
    orderPlacedOnDate: {
      type: Date,
      default: Date.now(),
    },
    orderStatusUpdateOn: [
      {
        updatedStatus: String,
        updatedOn: Date,
      },
    ],
    status: {
      type: String,
      required: true,
      default: "order_placed",
      enum: {
        values: ["order_placed", "order_received", "cancelled"],
        message:
          "Status can be either: Order Placed, Order Received, Cancelled",
      },
    },
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

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
