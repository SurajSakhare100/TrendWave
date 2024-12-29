import { OAuth2Client } from "google-auth-library";
import {User} from "../../models/User.model.js";
import { options } from "../../utils/constant.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const newUser = new User({
      userName,
      email,
      password,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
// Google Login
const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      try {
        user = new User({
          userName: name,
          email,
          password: null,
          provider: "google",
        });
        await user.save();
      } catch (error) {
        console.log(error);
      }
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const userWithoutSensitiveData = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: userWithoutSensitiveData,
        message: "User logged in successfully",
      });
  } catch (error) {
    next(error);
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    

    const userWithoutSensitiveData = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        data: userWithoutSensitiveData,
        success: true,
        message: "Login successful",
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};
const getuser = async (req, res) => {

  try {

    const user = await User.findById(req.user._id).select(
      "-password -refreshToken -provider -__v"
    );

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });
    }

    res
      .status(200)
      .json({
        user,
        success: true,
        message: "Login successful",
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("accessToken").json({
    success: true,
    message: "Logged out successfully!",
  });
};

export {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  getuser
};
