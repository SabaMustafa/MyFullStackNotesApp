import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
          <h2>Notes App</h2>
          <Link to="/register" style={{ marginRight: 10 }}>Register</Link>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/create" style={{ marginRight: 10 }}>Create Note</Link>
          <Link to="/notes" style={{ marginRight: 10 }}>View Notes</Link>
          <LogoutButton />
        </nav>

        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create" element={<NoteForm />} />
          <Route path="/notes" element={<NotesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
