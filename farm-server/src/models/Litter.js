const mongoose = require("mongoose");

const litterSchema = new mongoose.Schema(
  {
    kindlingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kindling",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Litter", litterSchema);