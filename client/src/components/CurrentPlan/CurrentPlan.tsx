import React, { useEffect, useState } from 'react'
import { sendData } from '../../helper/util';
import classes from './CurrentPlan.module.css';

export default function CurrentPlan() {
  const [currentPlan, setCurrentPlan] = useState();
  useEffect(() => {
    async function fetchListOfPayment() {
      const resData = await sendData("payment-history", null, false);
      setCurrentPlan(resData);
    }
    fetchListOfPayment();
  }, []);
  return (
    <div className={classes.div}>
      show current plan details.
      {currentPlan}
    </div>
  )
}
