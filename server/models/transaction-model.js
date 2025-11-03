// THIS FILE IS CREATED TO CONTRUCT THE MODELS AND SCHEMAS THAT ARE TO BE STORED ON THE DATABSE
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: true},
  amount: { type: Number, required: true },
  credits: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Number },
});

// USING THE ABOVE SCHEMA, A MODEL IS CREATED BELOW WITH THE NAME "USER"
// 'OR' OPERATOR IS USED BECAUSE IT WILL FIRST CHECK, IF THE MODEL ALREADY EXISTS, IT WON'T CREATE ANY MODEL, ELSE IT WILL  
const transactionModel = mongoose.models.transaction || mongoose.model("transaction", transactionSchema);

export default transactionModel;