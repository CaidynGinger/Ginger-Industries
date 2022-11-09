const express = require("express");
const userSchema = require("../models/users");
const userRouter = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { user, pwd, Email } = req.body;

  console.log(!user || !pwd || !Email);

  if (!user || !pwd || !Email) {
    return res
      .status(400)
      .json({ message: "Username, Email and password are required." });
  }

  const usernameDuplicate = await userSchema.findOne({ username: user }).exec();
  const emailDuplicate = await userSchema.findOne({ email: Email }).exec();
  if (usernameDuplicate) {
    return res.sendStatus(409); //Conflict
  }
  if (emailDuplicate) {
    return res.sendStatus(410); //Conflict
  }
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await userSchema.create({
      username: user,
      password: hashedPwd,
      email: Email,
    });

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

userRouter.post("/auth", async (req, res) => {
  // res.json("hello")
  console.log(req.body);
  const email = req.body.email;
  const pwd = req.body.pwd;
  console.log(pwd);
  console.log(email);
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  const foundUser = await userSchema.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = foundUser.roles;
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // console.log(roles);
    console.log(refreshToken);

    // Creates Secure Cookie with refresh token
    // res.json("save cookie");
    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   // secure: true,
    //   sameSite: "None",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    // Send authorization roles and access token to user
    // console.log(accessToken);
    res.json({ roles, accessToken, refreshToken  });
  } else {
    res.sendStatus(401);
  }
});

module.exports = userRouter;