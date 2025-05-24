import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentInputs, setCommentInputs] = useState({});

  
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:3001/api/blogs';
      if (searchQuery) {
        url += `/search?q=${encodeURIComponent(searchQuery)}`;
      }
      const res = await axios.get(url);
      setBlogs(res.data);
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]); // depends on searchQuery

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // now depend on memoized fetchBlogs

  // Like blog
  const handleLike = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:3001/api/blogs/${id}/like`);
      setBlogs(blogs.map(blog => (blog._id === id ? res.data : blog)));
    } catch (err) {
      console.error('Failed to like blog', err);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Failed to delete blog', err);
    }
  };

  // Comment input change
  const handleCommentChange = (blogId, value) => {
    setCommentInputs({ ...commentInputs, [blogId]: value });
  };

  // Submit comment
  const handleCommentSubmit = async (e, blogId) => {
    e.preventDefault();
    const text = commentInputs[blogId];
    if (!text || text.trim() === '') return alert('Comment cannot be empty.');

    try {
      const res = await axios.post(`http://localhost:3001/api/blogs/${blogId}/comments`, {
        name: 'Anonymous',
        text,
      });
      setBlogs(blogs.map(blog => (blog._id === blogId ? { ...blog, comments: res.data } : blog)));
      setCommentInputs({ ...commentInputs, [blogId]: '' });
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // The searchQuery state change triggers fetchBlogs via useEffect
  };

  return (
    <div className="home-container">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>All Blogs</h2>

      <form onSubmit={handleSearchSubmit} style={{ maxWidth: 400, margin: '0 auto 2rem', display: 'flex', gap: 10 }}>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          required
          style={{ flex: 1, padding: '0.6rem', fontSize: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.6rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: 5 }}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog._id} className="blog">
            <h3>{blog.title}</h3>
            <p>{blog.snippet}</p>
            <p>{blog.body}</p>

            <div className="blog-actions">
              <button className="like" onClick={() => handleLike(blog._id)}>Like</button>
              <span className="like-count">{blog.likes} likes</span>

              <Link to={`/blogs/${blog._id}/edit`} style={{ marginLeft: '10px', textDecoration: 'none' }}>
                <button>Edit</button>
              </Link>

              <button
                className="delete"
                onClick={() => handleDelete(blog._id)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </div>

            {/* Comments Section */}
            <div className="comments">
              {blog.comments && blog.comments.length > 0 ? (
                blog.comments.map((c, i) => (
                  <div key={i} className="comment">
                    <strong>{c.username || c.name || 'Anonymous'}</strong>: {c.text}
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>

            {/* Comment Form */}
            <form className="comment-form" onSubmit={(e) => handleCommentSubmit(e, blog._id)}>
              <textarea
                placeholder="Add a comment..."
                value={commentInputs[blog._id] || ''}
                onChange={(e) => handleCommentChange(blog._id, e.target.value)}
              />
              <button type="submit">Post Comment</button>
            </form>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
