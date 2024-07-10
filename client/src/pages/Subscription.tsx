import React from 'react';
import Subscription from '../components/Subscription/Subscription';
import Navbar from '../components/Navbar/Navbar';

const SubscriptionPage: React.FC = () => {
  return (
    <div className='Subscription_Page'>
      <Navbar/>
      <Subscription />
    </div>
  );
};

export default SubscriptionPage;

