import express from "express";
import  AuthRoutes  from "./routes/AuthRoutes.js";
import dotenv from 'dotenv';
import connectDB from "./config.js";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://user-data-one-pi.vercel.app'],
  credentials: true,
}));

const PORT = process.env.PORT || 8080;
app.use(express.json());

app.use("/api/auth", AuthRoutes);
connectDB();

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
