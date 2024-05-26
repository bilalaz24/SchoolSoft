const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserModel");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
    if (err) return res.sendStatus(403);

    try {
      const user = await User.findById(payload._id);
      if (!user) return res.sendStatus(404);

      req.user = user.toObject();
      next();
    } catch (dbErr) {
      console.error(dbErr);
      res.sendStatus(500);
    }
  });
}

function authorizeStaff(req, res, next) {
  if (req.user.role !== "staff") {
    return res
      .status(403)
      .send("You do not have permission to access this resource.");
  }
  next();
}

function authorizeStudent(req, res, next) {
  if (req.user.role !== "student") {
    return res
      .status(403)
      .send("You do not have permission to access this resource.");
  }
  next();
}

module.exports = { authenticateToken, authorizeStaff, authorizeStudent };
