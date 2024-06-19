import React, { useEffect, useState } from 'react'
import { sendData } from '../../helper/util';
import classes from './CurrentPlan.module.css';
import { useNavigate } from 'react-router-dom';

interface plan{
  name:string;
  description:string;
  duration: Number;
}
export default function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListOfPayment() {
      const resData = await sendData('GET',"payment-history", true);
      if (resData) {
        setCurrentPlan(resData);
      }
    }
    fetchListOfPayment();
  },[]);
  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Current Plan Details</h1>
      <div className={classes.content}>
      <h2>{!currentPlan && <p className={classes.noPlan}>No plan purchased yet!</p>}</h2>
      <h1>{currentPlan && currentPlan.name}</h1>
      <p>{currentPlan && currentPlan.description}</p>
      <p>{currentPlan && `Duration of the plan is ${currentPlan.duration}`}</p>
      </div>
    </div>
  );
}
