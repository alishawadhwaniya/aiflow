// server/server.js

// 1. LOAD ENV VARS FIRST (Must be at the very top!)
const dotenv = require('dotenv');
dotenv.config(); 

// 2. Now import everything else
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes'); // Now this will see the API Key

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});