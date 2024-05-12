const Note = require("../models/noteModel");
const User = require("../models/userModel");

const getController = async (req, res) => {
  try {
    const { user_id } = req.user;
    const notes = await Note.find({ user: user_id });
    res.status(200).json(notes);
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const postController = async (req, res) => {
  try {
    const { title, note } = req.body;
    const { user_id } = req.user;
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.json({ message: "User not found, unauthorized." });
    }
    const newNote = await Note.create({
      user: user_id,
      title: title,
      note: note,
    });

    res.status(201).json({ message: "New note created successfully", newNote });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const updateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateNote = await Note.findOne({ _id: id });
    if (!updateNote) {
      return res.json({ message: "Note not found!" });
    }
    const { user_id } = req.user;
    if (updateNote.user.toString() !== user_id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    const { title, note } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        note: note,
      },
      { new: true }
    );
    res.status(201).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

const deleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteNote = await Note.findOne({ _id: id });
    if (!deleteNote) {
      return res.json({ message: "Note not found!" });
    }
    const { user_id } = req.user;
    if (deleteNote.user.toString() !== user_id) {
      return res.json({ message: "Unauthorized user" });
    }
    const deletedNote = await Note.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Note deleted successfully", deletedNote });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = {
  getController,
  postController,
  updateController,
  deleteController,
};
