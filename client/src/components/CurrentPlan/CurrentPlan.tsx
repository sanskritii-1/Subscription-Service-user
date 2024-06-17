import React, { useEffect, useState } from 'react'
import { sendData } from '../../helper/util';
import classes from './CurrentPlan.module.css';
interface plan{
  name:string;
  description:string;
  duration: Number;
}
export default function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState<plan>();
  useEffect(() => {
    async function fetchListOfPayment() {
      const resData = await sendData("payment-history", null, false);
      setCurrentPlan(resData);
    }
    fetchListOfPayment();
  }, []);
  return (
    <div className={classes.div}>
      <h1>{!currentPlan && <p>No plan purchased yet!</p>}</h1>
      <h1>{currentPlan && currentPlan.name}</h1>
      <p>{currentPlan && currentPlan.description}</p>
      <p>{currentPlan && `Duration of the plan is ${currentPlan.duration}`}</p>
    </div>
  )
}
