import React from 'react';
import { useLocation } from 'react-router-dom';
import Payment from '../components/Payment/Payment';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const amount = state ? state.amount : 0;
  const planId = state ? state.planId : '';

  return (
    <div>
      <Payment isOpen={true} onClose={() => {}} amount={amount} planId={planId} />
    </div>
  );
};

export default PaymentPage;
