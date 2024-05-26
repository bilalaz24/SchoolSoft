const express = require("express");
const Homework = require("../models/HomeworkModel");
const {
  authenticateToken,
  authorizeStaff,
  authorizeStudent,
} = require("../middleware/AuthenticationMiddleware");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allHomework = await Homework.find({});

    res.status(200).json({
      data: allHomework,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateToken, authorizeStaff, async (req, res) => {
  try {
    const { subject, dueDate, to, title, body } = req.body;

    if (!subject || !dueDate || !to || !title || !body) {
      return res.status(400).send("All fields required");
    }

    const newHomework = {
      subject: subject,
      dueDate: dueDate,
      to: to,
      title: title,
      body: body,
    };

    const homework = await Homework.create(newHomework);

    res.status(201).json({
      message: "Successfully created homework",
      data: homework,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.patch(
  "/result/:id",
  authenticateToken,
  authorizeStaff,
  async (req, res) => {
    try {
      const id = req.params.id;
      const result = req.body;

      const updatedHomework = await Homework.findByIdAndUpdate(id, result, {
        new: true,
        runValidators: true,
      });

      if (!updatedHomework) {
        return res.status(404).send("Homework not found");
      }

      res.status(201).json({
        message: "Successfully updated homework",
        data: updatedHomework,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/authenticated",
  authenticateToken,
  authorizeStudent,
  async (req, res) => {
    try {
      userYearLevel = req.user.yearLevel.split("")[0];

      const homework = await Homework.find({ to: userYearLevel });

      res.status(200).json({
        data: homework,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/authenticated/:subject",
  authenticateToken,
  authorizeStudent,
  async (req, res) => {
    try {
      const subject = req.params.subject;
      const userYearLevel = req.user.yearLevel.split("")[0];

      const homework = await Homework.find({
        to: userYearLevel,
        subject: subject,
      });

      res.status(200).json({
        data: homework,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/authenticated/week/:week",
  authenticateToken,
  authorizeStudent,
  async (req, res) => {
    try {
      const week = req.params.week;
      const userYearLevel = req.user.yearLevel.split("")[0];

      const homework = await Homework.find({
        to: userYearLevel,
        dueWeek: week,
      });

      res.status(200).json({
        data: homework,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
