const { Schema, model, Types } = require("mongoose");

const exerciseSchema = new Schema(
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "User", // This references the User model for the creator
    },
    name: {
      type: String,
      required: [true, "Exercise name is required."],
      trim: true,
    },
    target_muscle: {
      type: String,
      required: [true, "Target muscle is required."],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required."],
    },
    equipment: {
      type: String,
      trim: true,
      required: [false, "Equipment is not required."],
    },
    sets: {
      // Array of objects defining sets within the exercise
      type: [
        {
          reps: {
            type: Number,
            required: [true, "Reps is required."],
          },
          weight: {
            type: Number,
            required: [false, "Weight is not required."],
          },
          rest_time: {
            type: Number,
            required: [false, "Rest time is not required."],
          },
        },
      ],
      default: undefined, // Allows 'sets' to be empty if not provided
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const exercise = model("Exercise", exerciseSchema);

module.exports = exercise;
