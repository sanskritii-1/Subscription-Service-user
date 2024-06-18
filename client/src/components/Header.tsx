import React from 'react';
import './Header.css';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handle = () => {
    navigate('/current-plan-details');
  };

  return (
    <div className="header">
      <div className="search">
      <input type="text" placeholder="search subscriptions here..." />
      <GrSearch className="search-icon" />
              </div>
      <div className="icons">
        <div className="user-icon" onClick={handle}><FaRegCircleUser/></div>
        <div className="cart-icon"><FaShoppingCart/></div>
      </div>
    </div>
  );
}

export default Header;

