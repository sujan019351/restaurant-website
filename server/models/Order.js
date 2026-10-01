const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderToken: {
      type: String,
      required: true,
      unique: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    items: [orderItemSchema],
    subtotal: {
      type: Number,
      required: true,
    },
    taxes: {
      type: Number,
      default: 0,
    },
    platformFee: {
      type: Number,
      default: 2,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    canteenCounter: {
      type: String,
      default: "Atria Counter 1 - Main Canteen",
    },
    customerName: {
      type: String,
      default: "Student / Faculty Guest",
    },
    customerEmail: {
      type: String,
      default: "",
    },
    paymentMethod: {
      type: String,
      enum: ["PHONEPE", "GPAY", "UPI_QR", "CASH"],
      default: "UPI_QR",
    },
    payeeUpiId: {
      type: String,
      default: "atriacanteen@upi",
    },
    utrNumber: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
