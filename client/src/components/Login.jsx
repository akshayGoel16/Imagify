import React, { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  // THIS IS USED TO CHECK THE STATE OF USER, WHETHER HE IS NEW OR OLD USER SO LOGIN/SIGNUP APPEARS ACCORDINGLY
  const [state, setState] = useState("LogIn");

  // THIS IS IMPORTED FROM APPCONTEXT.JSX FILE TO SET THE SHOWLOGIN STATE, SO THAT THE CROSS ICON WORKS
  const { setShowLogin, backendURL, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try {
      if (state === "LogIn") {
        const { data } = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } 
      else {
        const { data } = await axios.post(backendURL + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
      
    } catch (error) {
      toast.error(data.message);
    }
  };

  // THE FOLLOWING USE-EFFECT IS USED TO DISABLE THE PAGE SCROLLING WHEN LOGIN FORM APPEARS ON SCREEN
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.7 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-3">
          {state}
        </h1>

        <p className="text-md text-center">Welcome Back!</p>
        <p className="text-sm text-center">
          Please{" "}
          <span className="text-blue-600">
            {state === "LogIn" ? "log in" : "sign up"}
          </span>{" "}
          to continue.
        </p>

        {state !== "LogIn" && (
          <div className="border px-3 py-2 flex items-center gap-2 rounded-full mt-4">
            <img src={assets.profile_icon} width={18} />
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
              className="outline-none text-sm"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-3 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} />
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            className="outline-none text-sm"
            type="email"
            placeholder="Email-ID"
            required
          />
        </div>

        <div className="border px-3 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} />
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            className="outline-none text-sm"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer text-center">
          {state === "LogIn" ? "Forgot Password?" : ""}
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer hover:bg-blue-900 transition-all duration-300">
          {state === "LogIn" ? "Log In" : "Create Account"}
        </button>

        {state === "LogIn" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("SignUp")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("LogIn")}
            >
              Log In
            </span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          className="absolute top-5 right-5 cursor-pointer"
          alt=""
        />
      </motion.form>
    </div>
  );
};

export default Login;
