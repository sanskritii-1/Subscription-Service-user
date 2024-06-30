import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentModal.css';
import { useSendData } from '../../helper/util';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface PaymentProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  planId: string;
}

const stripePromise = loadStripe('pk_test_51POayCP5gAI9NfaCKsSV5Ql5SR0HEiYyBfF8HdeHugcGeBAR268O8JGMmMfG1lCaVSLwzDtQoNUU2Ee1CmW6PDa500qXCzyVvw');

const PaymentForm: React.FC<PaymentProps> = ({ isOpen, onClose, amount, planId}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const sendData = useSendData();

  const subscribeHandler = async (planId: string) => {
    try {
      const resData = await sendData("POST", "/subscribe", true, {
        planId: planId,
      });
  
      navigate('/resources');
    } 
    catch (error) {
      console.error('Error subscribing to plan:', error);
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert("Payment error: " + error.message);
    } else {
      const { id } = paymentMethod;
      const response = await fetch('/api/xyz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          id,
        }),
      });

      if (response.ok) {
        await subscribeHandler(planId);
        onClose();
        alert("Payment successful!");
      } else {
        console.error('Payment failed');
        alert("Payment failed. Please try again.");
        
      }
    }
  };

  return (
    isOpen ? (
      <div className="PaymentModal">
        <h2>Payment</h2>
        <button onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit}>
          <br/>
          <CardElement className="CardElement" />
          <button type="submit" disabled={!stripe}>
            Pay ${amount}
          </button>
        </form>
      </div>
    ) : null
  );
};

const Payment: React.FC<PaymentProps> = (props) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default Payment;




//const subscribeHandler = async (planId: string) => {
//  try {
//    const resData = await sendData("POST", "/subscribe", true, {
//      planId: planId,
//    });
//
//    navigate('/resources');
//  } 
//  catch (error) {
//    console.log(error);
//  }
//};