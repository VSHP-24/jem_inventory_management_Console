import mongoose from "mongoose";

/////////////////////////////////////////////////
//             Creating Customer Schema
/////////////////////////////////////////////////

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [
        true,
        "A customer must have an existing user (customer) profile",
      ],
      unique: true,
    },
    shippingAddress: {
      type: String,
      required: [true, "A customer must have a shipping address"],
      trim: true,
    },
    shippingCity: {
      type: String,
      required: [true, "A customer must have a shipping city"],
      trim: true,
    },
    shippingState: {
      type: String,
      required: [true, "A customer must have a shipping state"],
      trim: true,
    },
    shippingPostCode: {
      type: Number,
      required: [true, "A customer must have a shipping post code"],
      trim: true,
    },
    shippingCountry: {
      type: String,
      required: [true, "A customer must have a shipping country"],
      trim: true,
    },
    billingAddress: {
      type: String,
      required: [true, "A customer must have a billing address"],
      trim: true,
    },
    billingCity: {
      type: String,
      required: [true, "A customer must have a billing city"],
      trim: true,
    },
    billingState: {
      type: String,
      required: [true, "A customer must have a billing state"],
      trim: true,
    },
    billingPostCode: {
      type: Number,
      required: [true, "A customer must have a billing post code"],
      trim: true,
    },
    billingCountry: {
      type: String,
      required: [true, "A customer must have a billing country"],
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "A customer must provide a phone number"],
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// THIS GETS ALL THE ORDERS UNDER SPECIFIC CUSTOMER
customerSchema.virtual("orderHistory", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
