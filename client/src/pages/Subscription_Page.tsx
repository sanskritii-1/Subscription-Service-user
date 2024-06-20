import React from 'react'
import './Subscription.css';
import Subscription from '../components/Subscriptions/Subscription';
import Header from '../components/Header';
// import Footer from '../components/Footer';

const SubscriptionPage: React.FC = () => {
  return (
    <div className='Subscription_Page'>
      <Header/>
      <Subscription/>
      {/* <Footer/> */}
    </div>
  )
}

export default SubscriptionPage;
