import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import React, { useState } from 'react';
import EditProfile from "./pages/EditProfile";

function App() {
  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user  ? <Home user={user} setUser={setUser} /> : <Navigate to="/login" replace />
        } 
      />
      
      <Route
        path="/login" 
        element={
          user  ? <Navigate to="/" replace /> : <Login setUser={setUser}/>
        } 
      />

      <Route 
        path="/register" 
        element={
          user  ? <Navigate to="/" replace /> : <Register />
        } 
      />

      <Route 
        path="/edit-profile" 
        element={<EditProfile />} 
      />
    </Routes>
  );
}

export default App;