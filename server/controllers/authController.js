const { argon2 } = require("argon2");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email }); 
    if (user) {
      return res.status(409).json({
        message: "User is already exist,you can login",
        success: false,
      });
    }
    
    const userModel = new UserModel({ name, email, password });
    userModel.password = await argon2.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email of password is wrong";
    if (!user) {
      return res.status(409).json({
        message: errorMsg,
        success: false,
      });
    }
    const isPassEql = await argon2.verify(password, user.password);
    console.log(isPassEql);
    if (!isPassEql) {
      return res.status(409).json({
        message: errorMsg,
        success: false,
      });
    }
    const jwtToken = jwt
      .sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      })
      .status(200)
      .json({
        message: "Login successfully",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
