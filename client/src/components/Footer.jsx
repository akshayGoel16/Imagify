import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between py-3 mt-20">
      <img src={assets.logo} alt="" width={150} />
      <p className="border-0 border-gray-400 text-sm text-gray-600 max-sm:hidden">Copyright @Alex.dev_16 | All Rights Reserved.</p>

      <div className="flex gap-5.5">
        <img src={assets.facebook_icon} alt="" width={35} />
        <img src={assets.twitter_icon} alt="" width={35} />
        <img src={assets.instagram_icon} alt="" width={35} />
      </div>
    </div>
  );
};

export default Footer;
