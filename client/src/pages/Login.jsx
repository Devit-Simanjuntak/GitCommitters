// frontend/src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ( { setUser } ) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('username and password are required!');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        name: username,
        password: password
      });

      if (response.status === 200) {
        // Login berhasil
        const user = response.data;
        alert(`Welcome ${user.name}!`);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user)
        // navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert(`Error: ${error.message}`);
      }      
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleRegisterRedirect}
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
