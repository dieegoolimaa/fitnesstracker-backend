const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
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
      required: [true, "IsInstructor is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
