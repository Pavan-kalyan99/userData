import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "connected to mongoose: Host::",
      connect.connection.host,
      "name::",
      connect.connection.name
    );
  } catch (err) {
    console.log("error in mongoDb", err);
  }
};
//module.exports=connectDB
export default connectDB;
