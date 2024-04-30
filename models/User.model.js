const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    age: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: false,
    },
    isInstructor: {
      type: Boolean,
      default: false,
      required: [false, "IsInstructor is required."],
    },
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    workoutFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
