import React from 'react';
import './Header.css';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handlePlan = () => {
    navigate('/current-plan-details');
  };
  const handlePayment = () => {
    navigate('/payment-history');
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="search">
      <input type="text" placeholder="search subscriptions here..." />
      <GrSearch className="search-icon" />
              </div>
      <div className="icons">
        <div className="user-icon" onClick={handlePlan}><FaRegCircleUser/></div>
        <div className="cart-icon" onClick={handlePayment}><MdPayment/></div>
        <div className="cart-icon" onClick={handleLogout}><FiLogOut/></div>
      </div>
    </div>
  );
}

export default Header;

