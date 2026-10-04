const mongoose = require("mongoose");

const kindlingSchema = new mongoose.Schema(
  {
    breedingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Breeding",
      required: true,
      unique: true,
    },

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

    kindlingDate: {
      type: Date,
      required: true,
    },

    totalBorn: {
      type: Number,
      required: true,
      min: 0,
    },

    alive: {
      type: Number,
      required: true,
      min: 0,
    },

    dead: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kindling", kindlingSchema);