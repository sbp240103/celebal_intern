const express = require('express');
const app = express();
const PORT = 3000;

// Middleware - logs request method and URL
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Route 1 - Home
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// Route 2 - About
app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
