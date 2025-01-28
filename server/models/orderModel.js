import mongoose from "mongoose";
import validator from "validator";

/////////////////////////////////////////////////
//             Creating Order Schema
/////////////////////////////////////////////////

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: [true, "An order must have a customer id"],
    },
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide us a phone number"],
      minlength: 10,
      maxlength: 10,
    },
    orderItems: [
      {
        quantity: Number,
        cost: Number,
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
      },
    ],
    cost: {
      type: Number,
      trim: true,
      required: [true, "An order must have total cost of orders"],
    },
    discountCode: {
      type: String,
      trim: true,
    },
    discountAmount: {
      type: Number,
      trim: true,
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
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["cod", "upi", "cards", "netbanking"],
        message: "Payment method can be either: COD, UPI ,Cards , NetBanking",
      },
    },
    paymentStatus: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["paid", "pending"],
        message: "Payment Status can be either: Paid , Not-Paid",
      },
    },
    orderStatus: {
      type: String,
      required: true,
      default: "order_placed",
      enum: {
        values: [
          "order_placed",
          "order_confirmed",
          "order_shipped",
          "order_delivered",
          "cancelled",
        ],
        message:
          "Status can be either: Order Placed, Order Confirmed, Order Received, Cancelled",
      },
    },
    orderStatusUpdateOn: [
      {
        updatedStatus: String,
        updatedOn: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
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

// THIS SAVES THE STATUS UPDATE HISTORY
orderSchema.pre("save", function (next) {
  if (this.isNew)
    this.orderStatusUpdateOn = [
      {
        updatedStatus: this.orderStatus,
        updatedOn: { default: Date.now() },
      },
    ];
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
