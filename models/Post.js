const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 50,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1000,
  },
  category: {
    type: String,
    enum: ["General", "News", "Discussion", "Announcement","Technical"], 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Post", postSchema);
