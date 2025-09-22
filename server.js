const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Routes
let index = require("./routes/index");
let image = require("./routes/image");

// MongoDB Atlas connection
const mongodbUri = process.env.MONGODB_URI;
const dbName = "darkroom";

mongoose
  .connect(`${mongodbUri}${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

// Initialize app
const app = express();

// View engine
app.set("view engine", "ejs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());

// Routes
app.use("/", index);
app.use("/image", image);

// Landing page (example)
app.get("/", async (req, res) => {
  try {
    // Replace with your actual model
    // const images = await Image.find();
    res.status(200).send("Landing Page"); // keep simple for testing
    // res.render("index", { images });
  } catch (err) {
    console.error("Error retrieving images:", err);
    res.status(500).send("Error retrieving images");
  }
});

// ✅ Start server only if not testing
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server is listening at http://localhost:${PORT}`)
  );
}

// ✅ Export the app for testing
module.exports = app;
