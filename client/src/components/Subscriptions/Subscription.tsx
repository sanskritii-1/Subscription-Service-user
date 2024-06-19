import React, { useEffect, useState } from "react";
import "./Subscription.css";
import { useNavigate } from "react-router-dom";
import { sendData } from "../../helper/util";

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/subscription-plans"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);
  const subcribeHandler = async () => {
    try {
      const resData = await sendData("POST", "/subscribe", true, {
        subscriptions,
      });
    } catch (error) {
      alert(error);
      navigate("/login");
    }
  };
  return (
    <div className="show-subscriptions">
      <h2>List of Subscriptions :</h2>
      {subscriptions.map((subscription) => (
        <div key={subscription._id}>
          <h3>{subscription.name}</h3>
          <p>Resources: {subscription.resources}</p>
          <p>Price: ${subscription.price}</p>
          <p>Duration: {subscription.duration} months</p>
          {/* <p>Features: {subscription.features}</p> */}
          <br />
          <button onClick={subcribeHandler} className="subscribe-button">
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
