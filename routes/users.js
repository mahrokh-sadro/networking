const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');
const { check } = require('express-validator');
const router = express.Router();
// const  validationResult  = require('express-validator/check').validationResult
const  validationResult  = require('express-validator/check').validationResult

const { JsonWebTokenError } = require("jsonwebtoken");
const UserModel = require('../models/UserModel')




router.post(
    '/',
   [ check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),]
    ,
    async (req, res) => {
    //   const errors = validationResult(req);
    const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password } = req.body;
  
      try {
        let user = await UserModel.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        const avatar = normalize(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          }),
          { forceHttps: true }
        );
  
        user = new UserModel({
          name,
          email,
          avatar,
          password
        });
  
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            user.password=undefined
            res.json({ token,user });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );



module.exports = router;
