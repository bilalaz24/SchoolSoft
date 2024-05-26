const express = require("express");
const connectDB = require("./database");
const authenticationRoute = require("./routes/AuthenticationRoute");
const newsRoute = require("./routes/NewsRoute");
const messagesRoute = require("./routes/MessagesRoute");
const homeworkRoute = require("./routes/HomeworkRoute");
const weeklyPlanningRoute = require("./routes/WeeklyPlanningRoute");
const lunchMenuRoute = require("./routes/LunchMenuRoute");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authenticationRoute);
app.use("/api/news", newsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/planning", weeklyPlanningRoute);
app.use("/api/homework", homeworkRoute);
app.use("/api/lunch", lunchMenuRoute);

connectDB();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
