const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');  // Import auth routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json()); // Both are acceptable for parsing JSON

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/3dprinting', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);  // Use auth routes
const materialRoutes = require('./routes/material'); // Assuming this is where the POST route is defined
app.use('/api/material', materialRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
