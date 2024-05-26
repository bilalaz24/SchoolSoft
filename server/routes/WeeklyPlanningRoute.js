const express = require("express");
const WeeklyPlanning = require("../models/WeeklyPlanningModel");
const {
  authenticateToken,
  authorizeStaff,
  authorizeStudent,
} = require("../middleware/AuthenticationMiddleware");
require("dotenv").config();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allWeeklyPlanning = await WeeklyPlanning.find({});

    res.status(200).json({
      data: allWeeklyPlanning,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", authenticateToken, authorizeStaff, async (req, res) => {
  try {
    const { subject, week, to, title, body } = req.body;

    if (!subject || !week || !to || !title || !body) {
      return res.status(400).send("All fields required");
    }

    const newPlanning = {
      subject: subject,
      week: week,
      to: to,
      title: title,
      body: body,
    };

    const weeklyPlanning = await WeeklyPlanning.create(newPlanning);

    res.status(201).json({
      message: "Successfully created Weekly Planning",
      data: weeklyPlanning,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/authenticated",
  authenticateToken,
  authorizeStudent,
  async (req, res) => {
    try {
      userYearLevel = req.user.yearLevel.split("")[0];

      const weeklyPlanning = await WeeklyPlanning.find({ to: userYearLevel });

      res.status(200).json({
        data: weeklyPlanning,
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

      const weeklyPlanning = await WeeklyPlanning.find({
        to: userYearLevel,
        week: week,
      });

      res.status(200).json({
        data: weeklyPlanning,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/authenticated/subject/:subject",
  authenticateToken,
  authorizeStudent,
  async (req, res) => {
    try {
      const subject = req.params.subject;
      const userYearLevel = req.user.yearLevel.split("")[0];

      const weeklyPlanning = await WeeklyPlanning.find({
        to: userYearLevel,
        subject: subject,
      });

      res.status(200).json({
        data: weeklyPlanning,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
