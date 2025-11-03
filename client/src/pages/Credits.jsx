import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Credits = () => {
  const { user, backendURL, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits.
      currency: order.currency,
      name: "Credits Payment", //your business name
      description: "Test Transaction",
      // "image": "https://example.com/your_logo",
      order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendURL + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credits Added!");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    // document.getElementById("rzp-button1").onclick = function (e) {
    rzp.open();
    // e.preventDefault();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }
      const { data } = await axios.post(
        backendURL + "/api/user/pay-razorpay",
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      className="min-h-[80vh] text-center pt-14 mb-10"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>

      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose Your Plan...
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border-0 rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-2xl font-medium"> ${item.price}</span> /{" "}
              {item.credits} credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="bg-gray-800 w-full text-white rounded-md text-sm mt-6 min-w-52 py-2.5 cursor-pointer hover:shadow-lg shadow-blue-500/50"
            >
              {user ? "Buy Now!" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Credits;
