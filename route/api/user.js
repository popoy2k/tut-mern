const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

route.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "Invalid Parameters." });

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User already exist." });
    }

    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(retUser => {
          jwt.sign(
            { id: retUser._id },
            config.get("jwtSecret"),
            {
              expiresIn: 60 * 60
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                user: {
                  id: retUser._id,
                  name: retUser.name,
                  email: retUser.email
                },
                token
              });
            }
          );
        });
      });
    });
  });
});

module.exports = route;
