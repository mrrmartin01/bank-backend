const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountType: {
      type: String,
      enum: ["savings", "current", "checking", "credit"],
      required: true,
    },
    accountNumber: {
      type: String,
      unique: true,
      required: true,
    },
    currency:{
      type: String,
      default:"USD"
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
