const mongoose = require("mongoose");

const rabbitSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    
    breed: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: null,
    },

    birthDate: {
      type: Date,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    fatherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rabbit",
      default: null,
    },

    motherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rabbit",
      default: null,
    },

    status: {
      type: String,
      enum: ["growing", "replacement", "for_sale", "sold","dead","culled"],
      default: "growing",
    },
    breedingStatus: {
      type: String,
      enum: ["not_ready", "ready", "active","inactive"],
      default: "not_ready",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rabbit", rabbitSchema);