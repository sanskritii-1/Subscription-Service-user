import React, { useEffect, useState } from "react";
import { sendData } from "../../helper/util";
import classes from "./CurrentPlan.module.css";
import { useNavigate } from "react-router-dom";

export default function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListOfPayment() {
      try {
        const resData = await sendData("GET", "payment-history", false);
        setCurrentPlan(resData);
      } catch (error) {
        alert(error);
        navigate("/login");
      }
    }
    fetchListOfPayment();
  });
  return (
    <div className={classes.div}>
      <h1>{!currentPlan && <p>No plan purchased yet!</p>}</h1>
      <div className={classes.planContainer}>
        <h1>{currentPlan && currentPlan.name}</h1>
        <p>{currentPlan && currentPlan.description}</p>
        <p>
          {currentPlan && `Duration of the plan is ${currentPlan.duration}`}
        </p>
      </div>
    </div>
  );
}
