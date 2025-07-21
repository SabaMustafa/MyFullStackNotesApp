import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/notes/notes/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setNotes(response.data);
      } catch {
        alert('Failed to fetch notes');
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
