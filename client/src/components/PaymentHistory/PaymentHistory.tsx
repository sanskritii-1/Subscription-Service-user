import React, { useState, useEffect } from "react";
import { sendData } from "../../helper/util";
import classes from "./PaymentHistory.module.css";

export default function PaymentHistory() {
  const [listOfPayment, setListOfPayment] = useState([]);
  useEffect(() => {
    async function fetchListOfPayment() {
      const resData = await sendData("payment-history", null, false);
      setListOfPayment(resData);
    }
    fetchListOfPayment();
  }, []);
  return (
    <div className={classes.div}>
      <h1 className={classes.h1}>Payment History</h1>
      <ul className={classes.ul}>
        {listOfPayment.length === 0 && (
          <p className={classes.noPayments}>No payments yet.</p>
        )}
        {listOfPayment.length !== 0 &&
          listOfPayment.map((payment) => {
            return (
              <li className={classes.payment}>
                {/* <h2>{payment.amount}</h2>
              Payment was done on {payment.date} */}
                <h2 className={classes.paymentDesc}>{payment}</h2>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
