import axios from "axios";
import userModel from "../models/user-model.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { prompt } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing Prompt!",
      });
    }
    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    if (!process.env.CLIPDROP_API) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error: missing ClipDrop API key",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          // ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
        timeout: 30000,
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated!",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
