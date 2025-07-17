import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const RegisterUser = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    console.log("data:", req.body);

    if (!name || !dob || !email || !password) {
      return res.status(400).send({ message: "all feilds are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, dob });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    await user.save();
    // res.json(agent);
    res.status(200).send({
      success: true,
      message: "user is added",
      user,
      token,
    });
  } catch (err) {
    return res.status(404).send({ success: false, message: `${err}` });
  }
};
