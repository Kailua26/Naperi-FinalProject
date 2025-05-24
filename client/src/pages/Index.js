import React, { useState, useEffect } from 'react';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch blogs from backend on component mount or when searchQuery changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = '/api/blogs';
        if (searchQuery) {
          url += `/search?q=${encodeURIComponent(searchQuery)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchQuery]);

  // Handle blog delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  // Handle search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // searchQuery state already updates on input change, so fetch triggers automatically
  };

  return (
    <div className="home-container">
      <div className="h2">
        <h2>All Blogs</h2>
      </div>

      <div className="search">
        <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="q"
            placeholder="Search blogs..."
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

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
            <a href={`/blogs/${blog._id}/edit`}>Edit</a>
            <button
              onClick={() => handleDelete(blog._id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
