const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const https = require('https');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(cors({
  origin: 'https://hotelsudarshan.com', 
}));
// Routes
app.use('/auth', authRoutes); 
app.use('/tasks', taskRoutes); 

// Database connection
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('task management API is running...');
});
// Start the server// HTTPS Server Setup
const options = {
// cert: fs.readFileSync('./certificates/fullchain.pem'),
// key: fs.readFileSync('./certificates/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/hotelsudarshan.com/fullchain.pem'),
key: fs.readFileSync('/etc/letsencrypt/live/hotelsudarshan.com/privkey.pem'),
};

// Create an HTTPS server
https.createServer(options, app).listen(8000, () => {
console.log(`Server running on  ${PORT}`);
});

