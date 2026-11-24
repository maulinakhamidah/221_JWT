const express = require('express');
const connectDatabase = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parsing JSON dan URL-encoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routing API
app.use('/api', require('./routes/api'));

// Root endpoint info
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server REST API Perpustakaan Komik & Autentikasi JWT aktif.',
    author: 'Maulina Khamidah (20240140221)',
    version: '1.0.0'
  });
});

async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`[Server] Aplikasi berjalan di http://localhost:${PORT}`);
  });
}

startServer();
