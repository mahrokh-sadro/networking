const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const { check, validationResult } = require("express-validator");

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  "/",
  [auth, [check("text", "Text is required").notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await UserModel.findById(req.user.id).select("-password");

      const newPost = new PostModel({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      res.status(500).send(`server error ${err}`);
    }
  }
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
//pv too
router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send(`server error ${err}`);
  }
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") res.status(500).send(`server error ${err}`);
  }
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
//////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;
