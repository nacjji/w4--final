const express = require("express");
const router = express.Router();

const Signup = require("./signup");
const Login = require("./login");
const Posts = require("./posts");

router.use("/signup", Signup);
router.use("/login", Login);
router.use("/posts", Posts);

module.exports = router;
