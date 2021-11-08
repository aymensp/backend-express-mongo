var mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
      timestamps : true
  }
);

const Student = mongoose.model('student', studentSchema);

module.exports = Student;