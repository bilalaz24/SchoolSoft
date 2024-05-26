const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const RefreshToken = require("../models/RefreshTokenModel");
const { authenticateToken } = require("../middleware/AuthenticationMiddleware");
require("dotenv").config();

const router = express.Router();

function generatePayload(user) {
  return {
    _id: user._id,
    role: user.role,
    username: user.username,
    firstName: user.firstName,
    surName: user.surName,
    personalNum: user.personalNum,
    email: user.email,
    yearLevel: user.yearLevel,
    subjectTeaching: user.subjectTeaching,
    yearLevelTeaching: user.yearLevelTeaching,
  };
}

function generateAccessToken(user) {
  const payload = generatePayload(user);
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ data: users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      role,
      username,
      firstName,
      surName,
      personalNum,
      email,
      yearLevel,
      subjectTeaching,
      yearLevelTeaching,
      password,
    } = req.body;

    if (role === "student") {
      if (
        !role ||
        !username ||
        !firstName ||
        !surName ||
        !personalNum ||
        !email ||
        !yearLevel ||
        !password
      ) {
        return res.status(400).send({ message: "All fields are required." });
      }
    } else if (
      !role ||
      !username ||
      !firstName ||
      !surName ||
      !personalNum ||
      !email ||
      !subjectTeaching ||
      !yearLevelTeaching ||
      !password
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }

    if (role !== "student" && role !== "staff") {
      return res
        .status(400)
        .send({ message: "Role has to be 'student' or 'staff'" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      role,
      username,
      firstName,
      surName,
      personalNum,
      email,
      yearLevel,
      subjectTeaching,
      yearLevelTeaching,
      password: hashedPassword,
    });

    const user = await newUser.save();

    return res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({ message: "Username already exists." });
    }
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/change-password", authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send("Current password is incorrect.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.send("Password successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/reset-password", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.send("Password successfully updated.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/token", async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  try {
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
    }).populate("user");
    if (!storedToken) return res.sendStatus(403);

    if (storedToken.expiresAt < new Date()) {
      await RefreshToken.findByIdAndRemove(storedToken._id);
      return res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const newAccessToken = generateAccessToken(user);
      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/logout/:token", async (req, res) => {
  const token = req.params.token;
  try {
    await RefreshToken.findOneAndDelete({ token: token });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/token/deleteAll", async (req, res) => {
  try {
    await RefreshToken.deleteMany({});
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.role) {
      return res.status(400).send("All fields required");
    }

    const user = await User.findOne({
      username: req.body.username,
      role: req.body.role,
    });

    if (!user) {
      return res.status(400).send("User doesn't exist");
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken(user);
      const refreshTokenPayload = generatePayload(user); // Use generatePayload here for refresh token
      const refreshToken = jwt.sign(
        refreshTokenPayload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "2d" }
      );

      const refreshTokenExpiresAt = new Date();
      refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 2);

      const newRefreshToken = new RefreshToken({
        token: refreshToken,
        user: user._id,
        expiresAt: refreshTokenExpiresAt,
      });

      await newRefreshToken.save();

      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).send("Wrong password");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/authenticated", authenticateToken, (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/teachers/:subject", authenticateToken, async (req, res) => {
  try {
    const subject = req.params.subject;
    const yearLevel = req.user.yearLevel;
    const users = await User.find({
      subjectTeaching: subject,
      yearLevelTeaching: { $in: [yearLevel] },
    });

    res.json({
      data: users,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.error(err);
  }
});

module.exports = router;
