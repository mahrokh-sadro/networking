const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ProfileModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");
const { check, validationResult } = require("express-validator");

// @route    get  /profile/me
// @desc     current user profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({
        message: "There is no profile for this user",
      });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send("server error-->" + err);
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
/////////////////////////////////////////fix
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").notEmpty(),
      check("skills", "Skills is required").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;
  }
);

module.exports = router;
