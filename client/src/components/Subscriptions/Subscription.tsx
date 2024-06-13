import React, { useEffect, useState } from 'react';
import './Subscription.css';
import axios from 'axios';

/*
const addPlan = async () => {
  try {
    const newPlan = {
      name: 'Free Plan',
      features: 'Feature 1 Feature 2',
      price: 29.99,
      duration: 12,
    };

    const response = await axios.post('http://localhost:5000/api/manage-subscription', newPlan);

    console.log(response.data); 
  } catch (error) {
    console.error('Error adding plan:', error);
  }
};

addPlan();
*/


const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/manage-subscription');
        const data = await response.json();
        if (Array.isArray(data)) {
        setSubscriptions(data);
      }  else {
        console.error('Error fetching subscriptions: Response is not an array.');
      }
      }  catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className='show-subscriptions'>
      <h2>List of Subscriptions :</h2>
      {subscriptions.map((subscription) => (
        <div className='show-subscriptions' key={subscription._id}>
          <h3>{subscription.name}</h3>
          <p>Features: {subscription.features}</p>
          <p>Price: ${subscription.price}</p>
          <p>Duration: {subscription.duration} months</p>
        </div>
      ))}
    </div>
  );
};

export default Subscriptions;
