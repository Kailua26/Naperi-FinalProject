const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render('blogs/index', { blogs });
});

// Show create blog form
router.get('/new', (req, res) => {
  res.render('blogs/create');
});

// Create new blog
router.post('/', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/blogs');
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('blogs/edit', { blog });
});

// Update blog
router.put('/:id', async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/blogs');
});

// Delete blog
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/blogs');
});

// Search
router.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
    try {
      const blogs = await Blog.find({
        title: { $regex: searchQuery, $options: 'i' }
      });
      res.render('blogs/index', { blogs });
    } catch (err) {
      res.status(500).send('Error searching blogs');
    }
  });
  
module.exports = router;
