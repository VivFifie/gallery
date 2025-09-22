const express = require("express");
const router = express.Router();
let Image = require("../models/images");

// API endpoint: return all images as JSON
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Render single image page
router.get("/:id", (req, res) => {
  Image.findById(req.params.id, function (err, image) {
    if (err) console.log(err);
    res.render("singleImage", { title: "Single Image", image: image });
  });
});

// Update image name
router.put("/:id", (req, res) => {
  Image.updateOne(
    { _id: req.params.id },
    { $set: { name: req.body.name } },
    { upsert: true },
    function (err) {
      if (err) console.log(err);
      res.redirect("/");
    }
  );
});

// Delete image
router.delete("/:id", (req, res) => {
  Image.deleteOne({ _id: req.params.id }, function (err) {
    if (err) console.log(err);
    res.redirect("/index");
  });
});

module.exports = router;
