import { User } from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SCREATE);
};
// Route for user login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password!" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      message: `${user.name} Login Successfull`,
      token,
    });
  } catch (error) {

   return res.status(400).json({
      success: false,
      message: `Internal Server Error ` || error,
    });
  }
};

// Route for user Register

export const userRegister = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "User is Already exist",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Please provid a strong password that contain atleast 8 character",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = generateToken(user._id);

    res.status(201).json({
      user,
      success: true,
      token,
      message: "User Register Successfully",
    });
  } catch (error) {
  return  res.status(400).json({
      success: false,
      message: `Registration Error`,
    });
  }
};

// Route for admin Login

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all detail",
      });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

        const token = jwt.sign(email + password, process.env.JWT_SCREATE);
        res.status(200).json({
            success:true,
            message:"Admin Login",
            token
        })
    } else{
        res.status(400).json({
            success:false,
            message:"Invalid Credentials"
        })
    }

  } catch (error) {
    res.status(400).json({
        success:false,
        message:error.message
    })
  }
};
