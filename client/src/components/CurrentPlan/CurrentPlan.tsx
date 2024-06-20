import React, { useEffect, useState } from 'react';
import { useSendData } from '../../helper/util';
// import { sendData } from '../../helper/util';
import classes from './CurrentPlan.module.css';
import { useNavigate } from 'react-router-dom';

interface Plan {
  planName: string;
  purchaseDate: string;
  duration: number;
  remainingDuration: string
}

export default function CurrentPlan() {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const sendData = useSendData();

  useEffect(() => {
    async function fetchCurrentPlan() {
      try {
        const resData = await sendData("GET", "current-plan-details", true);
        setCurrentPlan(resData);
      } 
      catch (err) {
        console.log(err);
        window.alert(err);
      }
    }
    fetchCurrentPlan();
  }, []);

  const unsubscribeHandler = async () =>{
    try {
      const resData = await sendData("POST", "unsubscribe", true);
    } 
    catch (err) {
      console.log(err);
      window.alert(err);
    }
  }

  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Current Plan Details</h1>
      {(
        <div className={classes.planContainer}>
          <h1 style={{color:"white"}}>{!currentPlan?.planName && <p>Free Plan</p>}</h1>
          <h1 style={{color:"black"}}>{currentPlan && currentPlan.planName} Plan</h1>
          <p>Purchase Date: {currentPlan && currentPlan.purchaseDate}</p>
          <p>Duration: {currentPlan && currentPlan.duration} Months</p>
          <p>Remaining duration: {currentPlan && currentPlan.remainingDuration} Days</p>
          <button onClick={unsubscribeHandler}>Unsubscribe</button>
        </div>
      )}
    </div>
  );
}
