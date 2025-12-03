import React from "react";

const Footer = () => {
  return (
    <footer className=" text-light text-center py-3 mt-auto"
    style= {{backgroundColor: "#0C2F19"}}
    >

      <h6 className="mb-0">© {new Date().getFullYear()} Financial Tracking and Optimization System — All Rights Reserved</h6>
    </footer>
  );
};

export default Footer;