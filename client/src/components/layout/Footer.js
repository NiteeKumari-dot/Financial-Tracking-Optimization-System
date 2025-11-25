import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <h6 className="mb-0">© {new Date().getFullYear()} Expense Management App — All Rights Reserved</h6>
    </footer>
  );
};

export default Footer;