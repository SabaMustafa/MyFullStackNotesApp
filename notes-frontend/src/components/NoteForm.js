import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/notes/create/', { title, content }, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      alert('Note created');
      setTitle('');
      setContent('');
    } catch (error) {
            console.error("Note creation error:", error.response?.data || error.message);
            alert("Note creation failed ?????????????");
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text"  name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea name="content"  placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
