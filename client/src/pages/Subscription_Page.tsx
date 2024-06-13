import React from 'react'
import './Subscription.css';
import Subscription from '../components/Subscriptions/Subscription';
import SubscriptionBanner from '../components/Subscriptions/SubscriptionBanner';

const SubscriptionPage: React.FC = () => {
  return (
    <div className='Subscription_Page'>
      <SubscriptionBanner />
      <Subscription/>
    </div>
  )
}

export default SubscriptionPage;
