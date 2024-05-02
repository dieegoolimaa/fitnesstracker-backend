const { Schema, model, Types } = require("mongoose");

const workoutSchema = new Schema(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Workout name is required."],
      trim: true,
    },
    exercises: [
      {
        type: Types.ObjectId,
        ref: "Exercise",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
