// Importing necessary modules
const express = require("express");
const path = require("path");

// Creating an Express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000; // Use the port defined in the environment variable or use port 3000 by default

// Middleware to serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
