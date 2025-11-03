// THIS FILE IS CREATED TO CONTRUCT THE MODELS AND SCHEMAS THAT ARE TO BE STORED ON THE DATABSE
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creditBalance: { type: Number, default: 5 },
});

// USING THE ABOVE SCHEMA, A MODEL IS CREATED BELOW WITH THE NAME "USER"
// 'OR' OPERATOR IS USED BECAUSE IT WILL FIRST CHECK, IF THE MODEL ALREADY EXISTS, IT WON'T CREATE ANY MODEL, ELSE IT WILL
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
