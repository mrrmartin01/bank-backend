const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionRef: {
      type: String,
      unique: true,
      default: () => `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["deposit", "withdrawal", "transfer", "payment"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    status: {
      type: String,
      enum: ["pending", "successful", "failed"],
      default: "successful",
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
