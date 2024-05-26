const express = require("express");
const {
  authenticateToken,
  authorizeStaff,
} = require("../middleware/AuthenticationMiddleware");
const News = require("../models/NewsModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const news = await News.find({}).populate("from");

    res.status(200).json({
      data: news,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

router.post("/create", authenticateToken, authorizeStaff, async (req, res) => {
  try {
    const { from, title, body } = req.body;

    if (!from || !title || !body) {
      return res.status(400).send({
        message: "All fields are required.",
      });
    }

    const newNews = {
      from: from,
      title: title,
      body: body,
    };

    const news = await News.create(newNews);

    res.status(201).json({
      message: "News created successfully",
      data: news,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

module.exports = router;
