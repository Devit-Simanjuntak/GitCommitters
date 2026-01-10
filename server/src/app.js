const express = require('express');
const cors = require('cors');
const app = express();

// CORS
app.use(cors({
  origin: true, // Mengizinkan semua origin
  credentials: true // Mengizinkan cookie/session jika perlu
}))

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/borrowings', borrowingRoutes);

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

module.exports = app;