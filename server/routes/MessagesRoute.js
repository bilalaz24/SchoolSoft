const express = require("express");
const {
  authenticateToken,
  authorizeStaff,
  authorizeStudent,
} = require("../middleware/AuthenticationMiddleware");
const Message = require("../models/MessageModel");
const { populate } = require("dotenv");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({}).populate("from");

    const populateAndFilterMessages = async (messages) => {
      const promises = messages.map(async (message) => {
        if (message.to.to.toString().length === 24) {
          await message.populate("to.to");
        }
        return message;
      });
      return Promise.all(promises);
    };

    const newMessages = await populateAndFilterMessages(messages);

    res.status(200).json({
      data: newMessages,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

router.get("/authenticated", authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({
      "to.to": { $in: [req.user._id, req.user.yearLevel] },
    }).populate("from");

    const populateAndFilterMessages = async (messages) => {
      const promises = messages.map(async (message) => {
        if (message.to.to.toString().length === 24) {
          await message.populate("to.to");
        }
        return message;
      });
      return Promise.all(promises);
    };

    const newMessages = await populateAndFilterMessages(messages);

    res.status(200).json({
      data: newMessages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const { from, to, title, body } = req.body;
    const { type, to: toTo } = to || {};

    if (!from || !type || !toTo || !title || !body) {
      return res.status(400).send({
        message: "All fields are required.",
      });
    }

    if (type !== "group" && type !== "student") {
      return res.status(400).send({
        message: "Type can only be group or student",
      });
    }

    const newMessage = {
      from: from,
      to: {
        type: type,
        to: toTo,
      },
      title: title,
      body: body,
    };

    const message = await Message.create(newMessage);

    res.status(201).json({
      message: "Message created successfully",
      data: message,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

module.exports = router;
