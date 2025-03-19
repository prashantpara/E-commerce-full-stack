const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPhone,
} = require("./validator");

// create User
const signUpUser = async (req, res) => {
  try {
    let userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "No Data Found, Bad Request" });
    }

    let { fName, lName, email, profilePic, phoneNo, password, address } =
      userData;

    // fName Validation
    if (!isValid(fName)) {
      return res.status(400).json({ msg: "fName is required" });
    }

    if (!isValidName(fName)) {
      return res.status(400).json({ msg: "Invalid fName" });
    }

    // lName Validation
    if (lName && !isValidName(lName)) {
      return res.status(400).json({ msg: "Invalid lName" });
    }

    // email validation
    if (!isValid(email)) {
      return res.status(400).json({ msg: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const checkDuplicateEmail = await userModel.findOne({ email });
    if (checkDuplicateEmail) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    // Phone Number Validation
    if (!isValid(phoneNo)) {
      return res.status(400).json({ msg: "Phone Number is required" });
    }

    if (!isValidPhone(phoneNo)) {
      return res.status(400).json({ msg: "Invalid Phone Number" });
    }

    const checkDuplicatePhone = await userModel.findOne({ phoneNo });
    if (checkDuplicatePhone) {
      return res.status(400).json({ msg: "Phone Number Already Exists" });
    }

    // password validation
    if (!isValid(password)) {
      return res.status(400).json({ msg: "Password is required" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const salt = await bcrypt.genSalt(20);
    const hashPassword = await bcrypt.hash(password, salt);

    // Address Validation
    if (!isValid(address)) {
      return res.status(400).json({ msg: "Address is Required" });
    }

    // Create User
    const createdUser = await userModel.create({
      fName,
      lName,
      email,
      profilePic,
      phoneNo,
      password: hashPassword,
      address,
    });
    return res
      .status(201)
      .json({ msg: "User Created Successfully", createdUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error in signupUser", error });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email is Required." });
    }
    if (!password) {
      return res.status(400).json({ msg: "Password is Required." });
    }

    let findEmail = await userModel.findOne({ email });
    if (!findEmail) {
      return res
        .status(400)
        .json({ msg: "User doesn't exist. Create Account First." });
    }
    const matchPassword = await bcrypt.compare(password, findEmail.password);
    if (!matchPassword) {
      return res.status(400).json({ msg: "Bad Credentials." });
    }

    // Generate Token using JWT
    let token = jwt.sign(
      {
        userId: findEmail._id,
        email,
      },

      "My-Shopping-cart",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ msg: "Login Successfully.", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error in loginUser", error });
  }
};

// getUser
const getUsers = async (req, res) => {
  try {
    let users = await userModel.find().select("-__v");
    if (!users.length === 0) {
      return res.status(404).json({ msg: "Users Not Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// getUserById
const getUserById = async (req, res) => {
  try {
    let userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid userId in getUserById." });
    }

    let LoggedinUser = req.user.userId;
    if (LoggedinUser !== userId) {
      return res
        .status(403)
        .json({ msg: "Bad authorization !!!  Invalid User" });
    }

    let user = await userModel.findById(userId).select("-__v");
    if (!user) {
      return res.status(400).json({ msg: "No User Found in getUserById." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// update
const updateUser = async (req, res) => {
  try {
    let userData = req.body;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Enter Data To Update." });
    }

    let userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ msg: "Invalid userId in updation." });
    }

    let LoggedinUser = req.user.userId;
    if (LoggedinUser !== userId) {
      return res
        .status(403)
        .json({ msg: "Bad authorization !!!  Invalid User" });
    }

    let { fName, lName, email, phoneNo, password, address } = userData;

    // fName Validation
    if (
      ((typeof fName !== "string" || fName.trim() === "") &&
        !isValidName(fName) ||
      !isValid(fName))
    ) {
      return res.status(400).json({ msg: "Invalid fName" });
    }

    // lName Validation
    if (lName) {
      if (!isValidName(lName)) {
        return res.status(400).json({ msg: "Invalid lName" });
      }
    }

    // email validation
    if (email) {
      if (!isValid(email)) {
        return res.status(400).json({ msg: "Email is required" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ msg: "Invalid Email" });
      }

      const checkDuplicateEmail = await userModel.findOne({ email });
      if (checkDuplicateEmail) {
        return res.status(400).json({ msg: "Email Already Exists" });
      }
    }

    // Phone Number Validation
    if (phoneNo) {
      if (!isValid(phoneNo)) {
        return res.status(400).json({ msg: "Phone Number is required" });
      }

      if (!isValidPhone(phoneNo)) {
        return res.status(400).json({ msg: "Invalid Phone Number" });
      }

      const checkDuplicatePhone = await userModel.findOne({ phoneNo });
      if (checkDuplicatePhone) {
        return res.status(400).json({ msg: "Phone Number Already Exists" });
      }
    }

    // password validation
    if (password) {
      if (!isValid(password)) {
        return res.status(400).json({ msg: "Password is required" });
      }

      if (!isValidPassword(password)) {
        return res.status(400).json({ msg: "Invalid Password" });
      }
      const salt = await bcrypt.genSalt(20);
      userData.password = await bcrypt.hash(password, salt);
    }

    // Address Validation
    if (address) {
      if (!isValid(address)) {
        return res.status(400).json({ msg: "Address is Required" });
      }
    }

    const updatedData = await userModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    if (!updatedData) {
      return res.status(200).json({ msg: "User Not Found." });
    }

    return res.status(200).json({ msg: "User Data Updated.", updatedData });
  } catch (error) {
    // console.log(error);

    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// delete
const deleteUser = async (req, res) => {
  try {
    let usersId = req.params.userId;
    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Enter Data To Update." });
    }

    let LoggedinUser = req.user.userId;
    if (LoggedinUser !== usersId) {
      return res
        .status(403)
        .json({ msg: "Bad authorization !!!  Invalid User" });
    }

    let deletedUser = await userModel.findByIdAndDelete(usersId);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User Not Found ." });
    }
    return res.status(200).json({
      msg: "User Data Deleted Successfully.",
      deletedUser: deletedUser.fName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = {
  signUpUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
