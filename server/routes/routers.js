const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

/* register user */
// router.post("/register", async (req, res) => {
//   const { fullName, email, contact, location, password, desc } = req.body;
//   if (!fullName || !email || !contact || !location || !password || !desc) {
//     res.status(422).json("please fill the data");
//   }
//   try {
//     const preuser = await users.findOne({ email: email });
//     console.log(preuser);

//     if (preuser) {
//       res.status(422).json("This user is already registered");
//     } else {
//       const adduser = new users({
//         fullName,
//         email,
//         contact,
//         location,
//         desc,
//         password,
//       });
//       await adduser.save();
//       res.status(201).json(adduser);
//       console.log(adduser);
//     }
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, status, contact, location, desc, password } =
      req.body; // Getting value from the request body

    if (
      !fullName ||
      !email ||
      !status ||
      !contact ||
      !location ||
      !desc ||
      !password
    ) {
      return res.status(400).json({ message: "Value is required" });
    }
    // Create a new record
    const newValue = new users({
      fullName,
      email,
      status,
      contact,
      location,
      desc,
      password,
    });

    // Save the value to MongoDB
    await newValue.save();

    res
      .status(201)
      .json({ message: "Value saved successfully!", value: newValue });
  } catch (error) {
    console.error("Error saving value:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/users/count endpoint to get total user count
router.get("/users/count", async (req, res) => {
  try {
    // Use the correct Mongoose method `countDocuments()`
    const userCount = await users.countDocuments();
    console.log(userCount); // For debugging (you can remove it in production)
    res.status(200).json({ totalUsers: userCount });
  } catch (err) {
    console.error("Error fetching user count:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/* get user data */
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

/* get individual user */
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

/* update user data */
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

/* delete user data */
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletuser = await users.findByIdAndDelete({ _id: id });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
