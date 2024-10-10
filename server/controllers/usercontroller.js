import { compare } from "bcrypt";
import User from "../models/userschema.js";
import jwt from "jsonwebtoken";

const maxage = 3 * 24 * 60 * 60 * 1000;

const createToken = (user, userid) => {
  return jwt.sign({ user, userid }, process.env.JWT_KEY, { expiresIn: maxage });
};

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password required",
      });
    }
    const user = await User.create({
      email,
      password,
    });

    res.cookie("jwt", createToken(email, user.id), {
      maxage,
      secure: true,
      samSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profilesetup: user.profilesetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: " Invalid password" });
    }
    res.cookie("jwt", createToken(email, user.id), {
      maxage,
      secure: true,
      samSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profilesetup: user.profilesetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getuserinfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userid);
    if (!userData) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profilesetup: userData.profilesetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateprofile = async (req, res, next) => {
  try {
    const { userid } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName || !color) {
      return res.status(404).send("FirstName,LastName and Color are required");
    }

    const userData = await User.findByIdAndUpdate(
        userid,
        {
          firstName,
          lastName,
          color,
          profilesetup: true,
        },
        {
          new: true,         
          runValidators: true
        }
      );

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profilesetup: userData.profilesetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      color: userData.color,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup, login, getuserinfo, updateprofile };
