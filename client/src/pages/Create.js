import React, { useState } from 'react';

function Create() {
  // State to hold form inputs
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const res = await fetch('/api/blogs', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, snippet, body }),
      });

      if (!res.ok) {
        throw new Error('Failed to create blog');
      }

      setSuccess('Blog created successfully!');
      setError(null);
      setTitle('');
      setSnippet('');
      setBody('');
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <>
      
        <h2>Create New Blog</h2>
      
      

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="snippet"
            placeholder="Snippet"
            required
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
          />
          <textarea
            name="body"
            placeholder="Body"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default Create;
