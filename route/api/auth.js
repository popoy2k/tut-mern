const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const authToken = require("../../middleware/auth");

route.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Invalid Parameters." });

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist." });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credential." });
      }
      jwt.sign(
        { id: user._id },
        config.get("jwtSecret"),
        {
          expiresIn: 60 * 60
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email },
            token
          });
        }
      );
    });
  });
});

route.get("/user", authToken, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => {
      res.json(user);
    });
});

module.exports = route;
