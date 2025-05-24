import React, { useEffect, useState } from 'react';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
