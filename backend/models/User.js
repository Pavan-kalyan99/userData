import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:String,
   email: String,
  password: String,
  dob: String,
  
},
{ timestamps: true }
);

export default mongoose.model("User", userSchema);
