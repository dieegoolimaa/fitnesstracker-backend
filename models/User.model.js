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

    // If is false is client/user if is true is instructor
    isInstructor: {
      type: Boolean,
      default: false,
      required: [false, "IsInstructor is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
