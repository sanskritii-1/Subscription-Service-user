import React, { useEffect, useState } from 'react';
import { sendData } from '../../helper/util';
import classes from './CurrentPlan.module.css';

interface Plan {
  planName: string;
  purchaseDate: string;
  duration: number;
  remainingDuration: string
}

export default function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  useEffect(() => {
    async function fetchCurrentPlan() {
      const resData = await sendData("GET", "current-plan-details", true);
      setCurrentPlan(resData);
    }
    fetchCurrentPlan();
  }, []);

  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Current Plan Details</h1>
      {(
        <div className={classes.planContainer}>
          <h1 style={{color:"red"}}>{!currentPlan?.planName && <p>You have a free plan</p>}</h1>
          <p>{currentPlan && currentPlan.planName} Plan</p>
          <p>Purchase Date: {currentPlan && currentPlan.purchaseDate}</p>
          <p>Duration: {currentPlan && currentPlan.duration}</p>
          <p>Remaining duration: {currentPlan && currentPlan.remainingDuration}</p>
        </div>
      )}
    </div>
  );
}
