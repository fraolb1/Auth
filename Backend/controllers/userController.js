import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with the email already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    console.log(res.cookie());
    res.status(200).json(user);
  } else {
    throw new Error("Can't Register the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User don't exist. PLESAE REGISTER FIRST");
  }

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid password or email");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
  res.status(200).json({ message: "User loggedout" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get User profile" });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id)

  if (user){

    user.name = req.user.name || user.name
    user.email = req.user.email || user.email
    // user.password = req.user.password || user.password
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)

  } else {

    res.status(401)
    throw new Error('user not found')
  
  }

});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
