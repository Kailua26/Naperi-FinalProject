const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Create new blog
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create blog' });
  }
});

// Get a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Update blog
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update blog' });
  }
});

// Delete blog
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Search blogs by title
router.get('/search/query', async (req, res) => {
  const searchQuery = req.query.q;
  try {
    const blogs = await Blog.find({
      title: { $regex: searchQuery, $options: 'i' }
    });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search blogs' });
  }
});

// Like a blog
router.patch('/:id/like', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like blog' });
  }
});

// Add a comment
router.post('/:id/comments', async (req, res) => {
  const { name, text } = req.body;
  if (!name || !text) {
    return res.status(400).json({ error: 'Name and comment text are required' });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    blog.comments.push({ name, text });
    await blog.save();
    res.status(201).json(blog.comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments
router.get('/:id/comments', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json(blog.comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
