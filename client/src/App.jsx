import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Credits from "./pages/Credits";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from 'react-toastify';

const App = () => {

  const {showLogin} = useContext(AppContext);


  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen 
    bg-linear-to-b from-teal-50 to-orange-50">

      <ToastContainer position="bottom-right"/>

      <Navbar/>

      {/* BELOW IS THE LOGIN COMPONENT THAT IS MOUNTED IN THIS APP.JSX FILE */}
      {showLogin && <Login/>}

      {/* BELOW ARE THE 3 PAGES THAT ARE A PART OF THE WEBAPP */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
