const express = require("express");
const {
  authenticateToken,
  authorizeStaff,
} = require("../middleware/AuthenticationMiddleware");
const LunchMenu = require("../models/LunchMenuModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const lunchMenu = await LunchMenu.find({});

    res.status(200).json({
      data: lunchMenu,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

router.get("/current/:week", async (req, res) => {
  try {
    const week = req.params.week;
    const lunchMenu = await LunchMenu.find({ week: week });

    res.status(200).json({
      data: lunchMenu,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

router.post("/create", authenticateToken, authorizeStaff, async (req, res) => {
  try {
    const { week, menus } = req.body;

    if (!week || !menus || menus.length === 0) {
      return res.status(400).send({
        message: "All fields required.",
      });
    }

    const hasInvalidMenu = menus.some(
      (menu) => !menu.day || !menu.main || !menu.vegetarian
    );
    if (hasInvalidMenu) {
      return res.status(400).send({
        message: "Each menu must have a day, main, and vegetarian field.",
      });
    }

    const newMenu = {
      week: week,
      menus: menus,
    };

    const menu = await LunchMenu.create(newMenu);

    res.status(201).json({
      message: "Lunch menu created successfully",
      data: menu,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

module.exports = router;
