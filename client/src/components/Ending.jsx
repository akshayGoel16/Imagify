import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Ending = () => {
  // IMPORTED THESE FROM APPCONTEXT.JSX FILE BECAUSE THEY ARE NEEDED FOR THE WORKING OF THE "GENERATE IMAGES" BUTTON
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-between my-20 py-12"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        See the Magic...
      </h1>
      <h1 className="text-2xl sm:text-2xl font-semibold mb-2">Try it now!</h1>
      <button onClick={onClickHandler} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-500 cursor-pointer">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </button>
    </motion.div>
  );
};

export default Ending;
