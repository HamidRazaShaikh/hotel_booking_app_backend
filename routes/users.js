const express = require("express");
const router = express.Router();

const {
  signUpUser,
  signInUser
 
  
} = require("../controllers/users");

router.route("/signup").post(signUpUser);
router.route("/signin").post(signInUser);

module.exports = router;