const mongoose = require("mongoose");

const weightHistorySchema = new mongoose.Schema(
    {
        rabbitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rabbit",
            required: true,
        },
        date : {
            type: Date,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("WeightHistory", weightHistorySchema);