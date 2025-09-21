const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // To load environment variables from .env file

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// MongoDB Atlas connection string from environment variables
const mongodbUri = process.env.MONGODB_URI;
const dbName = 'darkroom';

// Connecting to MongoDB Atlas
mongoose.connect(`${mongodbUri}${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error:', err));

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Use routes
app.use('/', index);
app.use('/image', image);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

// Refactor the route handler to use async/await
app.get('/', async (req, res) => {
  try {
    const images = await Image.find(); // Replace with your actual model
    res.render('index', { images });
  } catch (err) {
    console.error('Error retrieving images:', err);
    res.status(500).send('Error retrieving images');
  }
});
