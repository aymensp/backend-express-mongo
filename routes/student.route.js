var express = require("express");
var router = express.Router();
const Student = require("../models/student.model");
const db = require("../config/db");

// const query = require("util").promisify(db.query).bind(db);
// router.post("/", async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;
//   const student = new Student({
//     firstName,
//     lastName,
//     email: email.toLowerCase().trim(),
//     password,
//   });

//   const isUnique = await Student.findOne({ email: email.toLowerCase().trim() });
//   if (!isUnique) {
//     await student.save();
//     return res.json({ student });
//   }

//   res.json({ error: "email already registred" });
// });

// router.get("/", async (req, res) => {
//   const students = await Student.find();
//   res.json(students);
// });

// router.post("/create", async (req, res) => {
//   const { prenom, nom, email } = req.body;
//   const insertQuery =
//     "INSERT INTO `students` (`prenom`,`nom`,`email`) VALUES (?,?,?)";
//   const isEmailUniqueQuery = "SELECT * FROM `students` WHERE `email`=? LIMIT 1";

//   const isEmailUniqueResult = await query(isEmailUniqueQuery, [email]);
//   if (isEmailUniqueResult.length == 0) {
//     const insertResult = await query(insertQuery, [prenom, nom, email]);
//     return res.json(insertResult);
//   }

//   res.status(405).json({ error: "Email already created" });
// });

// router.post("/bulk-create", async (req, res) => {
//   const { data } = req.body;
//   const insertQuery =
//     "INSERT INTO `students` (`prenom`,`nom`,`email`) VALUES ?";

//   const insertResult = await query(insertQuery, [
//     data.map((el) => [el.prenom, el.nom, el.email]),
//   ]);

//   res.json(insertResult);
// });

module.exports = router;
