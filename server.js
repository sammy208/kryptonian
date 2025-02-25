const express = require('express'); // Import the Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const bodyParser = require('body-parser'); // Import Body Parser to parse incoming request bodies
const config = require('./config'); // Import configuration variables from config.js
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const fileRoutes = require('./routes/fileRoutes'); // Import file handling routes

const app = express(); // Initialize an Express application
const PORT = process.env.PORT || 3000; // Define the port to run the server on

// Middleware
app.use(bodyParser.json()); // Use Body Parser middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Use Body Parser middleware to parse URL-encoded bodies


//routes
app.use('/api/auth', authRoutes); // Use authentication routes for /api/auth
app.use('/api/files', fileRoutes); // Use file routes for /api/files



// Database connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 60000 })
  .then(function() {

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // Start the server and log the port it's running on
    });
    console.log('DB connected...');
  }) // Connect to MongoDB and log success message
  .catch(function(err) {
    console.log(err);
    process.exit(1);//exit the process 

  }); 




