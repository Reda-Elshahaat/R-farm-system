const mongoose = require("mongoose");

const breedingSchema = new mongoose.Schema(
  {
    maleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rabbit",
      required: true,
    },

    femaleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rabbit",
      required: true,
    },

    breedingDate: {
      type: Date,
      required: true,
    },

    expectedCheckDate: {
        type: Date,
        default: null,
    },
    
    checkDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "pregnant", "empty"],
      default: "pending",
    },

    expectedKindlingDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Breeding", breedingSchema);