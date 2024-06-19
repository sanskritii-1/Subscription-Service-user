import React, { useEffect, useState } from 'react';
import './Subscription.css';
import { sendData } from '../../helper/util';

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await sendData('GET', 'subscription-plans', false);
        if (Array.isArray(data)) {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className='subscriptions-container'>
      <h2>Available Subscriptions :</h2>
      <div className='cards'>
        {subscriptions.map((subscription) => (
          <div key={subscription._id} className='card'>
            <div className="card-header">
              <h3>{subscription.name}</h3>
              <p className="card-price">${subscription.price} USD</p>
            </div>
            <div className="card-body">
              <div className="card-detail">
                <i className="fas fa-clock"></i>
                <span>{subscription.duration} months</span>
              </div>
              <div className="card-detail">
                <i className="fas fa-database"></i>
                <span>{subscription.resources} Resource Access</span>
              </div>
              <div className="card-detail">
                <i className="fas fa-list"></i>
                <span>{subscription.features}</span>
              </div>
            </div>
            <button className="card-button">Subscribe now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;





