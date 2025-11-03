import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import transactionModel from "../models/transaction-model.js";

// BELOW ARE THE ASYNC CONTROLLER FUNCTIONS
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Registration Details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // PASSWORD ENCRYPTION
    // SALT ROUNDS/COST FACTOR = 10 TO 12 FOR MODERATE ENCRYPTION
    // HIGHER THE VALUE, BETTER WILL BE THE ENCRYPTION, MORE TIME IT WILL TAKE TO PROCESS

    // .GENSALT WILL GENERATE A RANDOM STRING (KNOWN AS SALT) THAT WILL BE ADDED TO THE PASSWORD BEFORE HASHING
    const salt = await bcrypt.genSalt(10);

    // BELOW LINE WILL HASH THE USER'S PASSWORD USING THE SALT CREATED ABOVE
    const hashPass = await bcrypt.hash(password, salt);

    // BELOW OBJECT WILL BE USED TO CREATE THE NEW USER'S RECORD IN THE DATABASE
    const userData = {
      name,
      email,
      password: hashPass,
    };

    // BELOW LINE JUST CREATES AN INSTANCE/DOCUMENT OF THE MODEL BASED ON THE SCHEMA IN USER_MODEL
    const newUser = new userModel(userData);

    // NEW_USER WILL BE SAVED IN THE DATABASE
    const user = await newUser.save();
    // THIS NEW_USER WILL GENERATE AN ID EACH TIME IT IS CREATED IN THE DATABASE

    // A TOKEN(STRING) WILL BE GENERATED THAT WILL BE SENT IN THE RESPONSE
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // THIS TOKEN CONTAINS PAYLOAD AS WELL AS THE SECRET KEY USED TO SIGN THE TOKEN

    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    // SHORTHAND FOR THE ABOVE TWO LINES OF CODE WILL BE
    // const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    // SHORTHAND FOR THE ABOVE TWO LINES OF CODE WILL BE
    // const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      token,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.user.id;
    const { planId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    if (!userId || !planId)
      return res
        .status(400)
        .json({ success: false, message: "Missing Details!" });

    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({ success: false, message: "Plan Not Found!" });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id,
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment Failed!" });
      }
      const userData = await userModel.findById(transactionData.userId);

      const creditBalance = userData.creditBalance + transactionData.credits;

      await userModel.findByIdAndUpdate(userData._id, {creditBalance})

      await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true})

      res.json({ success: true, message: "Credits Added!" });
    }else{
      res.json({ success: false, message: "Payment Failed!" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
