const Users = require("./../models/UserSchema");
const config = require("./../config.json");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  const {
    body: { userData },
  } = req;




  let isUserExists = await Users.find({ email: userData.email });

  if (isUserExists.length !== 0 ) {
    res.status(400).json({ success: false, message: "user already exists." });
  } else {
    try {
      const newUser = new Users(userData);
      newUser.save();
      const token = jwt.sign({ sub: newUser.id }, config.secret, {
        expiresIn: "7d",
      });

      // res.send({token: token})
    //   res.cookie('token', token, {
    //     httpOnly: false,
    //     secure: isSecure,
    //     signed: true
    // });

      res.status(200).json({ success: true, data: newUser, token : token});
      
    } catch (error) {
      res.status(400).json({ success: false, error: error });
    }
  }
};

const signInUser = async (req, res) => {
  const {
    body: { userData },
  } = req;

  try {
    let isUserExists = await Users.find({
      email: userData.email,
      password: userData.password,
    });
    if (isUserExists.length !== 0) {
      res.status(200).json({ success: true, data: isUserExists.at(0)});
    } else {
      res.status(400).json({ success: false, message: "user not found." });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

module.exports = { signUpUser, signInUser };
