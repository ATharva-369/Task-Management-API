import User from "../models/users.model.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({
        message: "User exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    console.log("-------------------------------------------------------------------")
    console.log(user.id)
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload: user-specific data
      process.env.JWT_SECRET, // Secret key stored in .env
      { expiresIn: "1h" } // Token expiration (1 hour in this case)
    );
    return res.status(201).json({
      message: "Create user successfully",
      token,
    });
  } catch (error) {
    console.error("Error creating user;", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // console.log(process.env.JWT_SECRET)
    console.log("-------------------------------------------------------------------")
    console.log(user.id)
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload: user-specific data
      process.env.JWT_SECRET, // Secret key stored in .env
      { expiresIn: "1h" } // Token expiration (1 hour in this case)
    );
    
    return res.status(200).json({
      message: "Logged in",
      token,
    });
  } catch (error) {
    console.error("Error logging user in;", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
