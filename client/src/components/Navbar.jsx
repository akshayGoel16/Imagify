import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, LogOut, credit } = useContext(AppContext);

  //   USE NAVIGATE IS USED TO MAKE THE BUTTON WORK THAT IS USED BELOW FOR LOGIN/LOGOUT
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          /* FOR LOGGED IN USER */
          <div className="flex gap-2 items-center sm:gap-3">
            <button
              onClick={() => navigate("/credits")}
              className="flex gap-2 items-center bg-blue-100 px-2 sm:px-4 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-500"
            >
              <img className="w-5" src={assets.credit_star} alt="" />

              <p className="text-xs sm:text-sm font-medium text-gray-600 hover:text-black">
                Credits Left: {credit}
              </p>
            </button>

            <p className="text-gray-600 max-sm:hidden pl-4">Hey {user.name}!</p>

            <div className="relative group">
              <img
                className="w-10 drop-shadow"
                src={assets.profile_icon}
                alt=""
              />

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border border-blue-500 text-sm">
                  <li onClick={LogOut} className="py-1 px-2 cursor-pointer pr-10">LogOut</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* FOR LOGGED OUT USER */
          <div className="flex items-center gap-2 sm:gap-5">
            <p onClick={() => navigate("/credits")} className="cursor-pointer">
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 cursor-pointer text-sm rounded-full hover:scale-110 transition-all duration-300 hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// SINCE NAVBAR IS TO BE SHOWN ON ALL THE PAGES IN THE WEBAPP, IT IS MADE AS A COMPONENT AND IMPORTED IN THE APP.JSX FILE
