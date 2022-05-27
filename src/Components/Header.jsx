import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="navBar">
      <NavLink to="/">HomePage</NavLink>
      <NavLink to="/Products">Products</NavLink>
    </div>
  );
};

export default Header;
