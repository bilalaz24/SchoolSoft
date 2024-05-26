const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    surName: {
      type: String,
      required: true,
    },
    personalNum: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    yearLevel: {
      type: String,
      validate: {
        validator: function (value) {
          if (this.role === "student") {
            const validYearLevels = [
              "3A",
              "3B",
              "3C",
              "3D",
              "4A",
              "4B",
              "4C",
              "4D",
              "5A",
              "5B",
              "5C",
              "5D",
              "6A",
              "6B",
              "6C",
              "6D",
            ];
            return validYearLevels.includes(value);
          }
          return value === undefined || value === "";
        },
        message: function (props) {
          // Changed to regular function to correctly bind `this`
          return `Invalid yearLevel "${props.value}" for role ${this.role}.`;
        },
      },
    },
    subjectTeaching: {
      type: [String],
      validate: {
        validator: function (values) {
          console.log("Validating subjectTeaching with value:", values); // Debug log
          if (this.role === "staff") {
            const validSubjects = [
              "Art",
              "Biology",
              "Civics",
              "Chemistry",
              "English",
              "Geography",
              "History",
              "Home Ec",
              "Math",
              "MFL",
              "Music",
              "PE",
              "Pe Theory",
              "Physics",
              "Religion",
              "Swedish",
              "Tech",
              "Text Craft",
              "Wood Craft",
            ];
            return values.every((value) => validSubjects.includes(value));
          }
          return values === undefined || values.length === 0;
        },
        message: function (props) {
          return `Invalid SubjectTeaching "${props.value}" for role ${this.role}.`;
        },
      },
    },
    yearLevelTeaching: {
      type: [String],
      validate: {
        validator: function (values) {
          if (this.role === "staff") {
            const validYearLevels = [
              "3A",
              "3B",
              "3C",
              "3D",
              "4A",
              "4B",
              "4C",
              "4D",
              "5A",
              "5B",
              "5C",
              "5D",
              "6A",
              "6B",
              "6C",
              "6D",
            ];
            return values.every((value) => validYearLevels.includes(value));
          }
          return values === undefined || values.length === 0;
        },
        message: function (props) {
          return `Invalid YearLevelTeaching "${props.value}" for role ${this.role}.`;
        },
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
