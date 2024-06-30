import React from 'react';
import { useLocation } from 'react-router-dom';
import Payment from '../components/Payment/Payment';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const amount = state ? state.amount : 0;
  const planId = state ? state.planId : '';
  const clientSecret = state ? state.clientSecret : '';

  return (
    <div>
      <Payment isOpen={true} onClose={() => {}} amount={amount} planId={planId} clientSecret={clientSecret} />
    </div>
  );
};

export default PaymentPage;
