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

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

router.get("/", async (req, res) => {
  try {
    const profile = await ProfileModel.find().populate("user", [
      "name",
      "avatar",
    ]);

    res.json(profiles);
  } catch (err) {
    res.status(500).send(`server error-->${err}`);
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:userId", async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.params.userId,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      res.status(400).json({
        message: "Profile not found",
      });

    res.json(profiles);
  } catch (err) {
    if (err.kind == "ObjectId") {
      res.status(400).json({
        message: "Profile not found",
      });
    }
    res.status(500).send(`server error ${err}`);
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    await ProfileModel.findOneAndRemove({ user: req.user.id });
    await UserModel.findOneAndRemove({ _id: req.user.id });
  } catch (err) {
    res.status(500).send(`server error ${err}`);
  }
});

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").notEmpty(),
      check("company", "Company is required").notEmpty(),
      check(
        "from",
        "From date is required and needs to be from the past"
      ).notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { title, company, location, from, to, current, description } =
      req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await ProfileModel.findOne({
        user: req.user.id,
      });
      profile.experience.unshift(newExperience);

      await profile.save();

      res.json(profile);
    } catch (err) {
      res.status(500).send(`server error ${err}`);
    }
  }
);

// @route    DELETE /profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete("/experience/:expId", auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
