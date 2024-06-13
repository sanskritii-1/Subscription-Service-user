import React from 'react';
import './Header.css';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Logo from './Logo.png';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo-container">
      <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="search">
      <input type="text" placeholder="search subscriptions here..." />
      <GrSearch className="search-icon" />
              </div>
      <div className="icons">
        <div className="user-icon"><FaRegCircleUser/></div>
        <div className="cart-icon"><FaShoppingCart/></div>
      </div>
    </div>
  );
}

export default Header;

