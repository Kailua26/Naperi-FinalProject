import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams(); // Get blog id from URL param
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  // Fetch blog data on mount
  useEffect(() => {
    fetch(`/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Blog not found');
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setSnippet(data.snippet);
        setBody(data.body);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  // Handle form submission to update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, snippet, body }),
      });

      if (!res.ok) {
        throw new Error('Failed to update blog');
      }

      navigate('/'); // Redirect to home or blog list after update
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <h2>Edit Blog</h2>
      <div className="edit">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <input
            type="text"
            name="snippet"
            value={snippet}
            required
            onChange={(e) => setSnippet(e.target.value)}
          /><br />
          <textarea
            name="body"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          ></textarea><br />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
}

export default Edit;
