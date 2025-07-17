import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(" eamil, pass::", req.body);
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.json({ token });
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    // res.json(agents);
    res.status(200).send({
      success: true,
      message: "all users",
      users,
    });
  } catch (err) {
    return res.status(404).send({ success: false, message: `${err}` });
  }
};