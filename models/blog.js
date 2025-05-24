const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: { type: String, default: 'Anonymous' },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [commentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
