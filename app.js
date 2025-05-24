require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./controllers/blogController');
const cors = require('cors');

const app = express();
console.log('MongoURI:', process.env.MONGO_URI);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Middleware
app.use(cors()); // Allow cross-origin requests from React
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/api/blogs', blogRoutes); // API routes for blogs

// 404 fallback for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


