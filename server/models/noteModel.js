const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provide user id"],
    },
    title: {
      type: String,
      required: [true, "Title required"],
    },
    note: {
      type: String,
      required: [true, "Note required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
