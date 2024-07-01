import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Subscription.css';
import { useSendData } from '../../helper/util';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Subscriptions: React.FC = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const sendData = useSendData();
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await sendData('GET', 'subscription-plans', false);
        const data = res.plans;
        console.log('Fetched subscriptions:', data);
        if (Array.isArray(data)) {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const paymentHandler = async (planId: string) => {
    try {
      const selectedSubscription = subscriptions.find(sub => sub._id === planId);
  
      const response = await sendData("POST", "/create-payment-intent", false, {
        amount: selectedSubscription.price,
      });
  
      if (!response || !response.ok) {
        throw new Error('Failed to fetch payment intent');
      }
  
      const { clientSecret } = await response.json();
  
      if (!clientSecret) {
        throw new Error('Client secret not received');
      }
  
      navigate('/PaymentGateway', {
        state: { amount: selectedSubscription.price, planId, clientSecret }
      });
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      toast.error('Failed to subscribe. Please try again.');
    }
  };
  

  const handleSearch = (query: string) => {
    const filtered = subscriptions.filter(subscription =>
      subscription.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSubscriptions(filtered);
  };

  return (
    <div className='subscriptions-container'>
      <Header onSearch={handleSearch} />
      <h2 className='subscriptions-header'>Available Subscriptions :</h2>
      <br></br>
      <div className='cards'>

        {filteredSubscriptions.length === 0 ? subscriptions.map((subscription) => (
          <div key={subscription._id} className='card'>
            <div className="card-header">
              <h3>{subscription.name}</h3>
            </div>
            <div className="card-body">
              <div className="card-detail">
                <i className="fas fa-clock"></i>
                <span>{subscription.duration} months</span>
              </div>
              <div className="card-detail">
                <i className="fas fa-database"></i>
                <span>
                  {subscription.resources === -1
                    ? "Unlimited Resource Access"
                    : `${subscription.resources} Resource Access`}
                </span>
              </div>
              <div className="card-detail">
                <i className="fas fa-list"></i>
                <span>{subscription.features}</span>
              </div>
              <p className="card-price">${subscription.price} USD</p>
            </div>
            <button className="card-button" onClick={() => paymentHandler(subscription._id)} >Subscribe now</button>
          </div>
        )) 
        
        : filteredSubscriptions.map((subscription) => (
          <div key={subscription._id} className='card'>
            <div className="card-header">
              <h3>{subscription.name}</h3>
            </div>
            <div className="card-body">
              <div className="card-detail">
                <i className="fas fa-clock"></i>
                <span>{subscription.duration} months</span>
              </div>
              <div className="card-detail">
                <i className="fas fa-database"></i>
                <span>
                  {subscription.resources === -1
                    ? "Unlimited Resource Access"
                    : `${subscription.resources} Resource Access`}
                </span>
              </div>
              <div className="card-detail">
                <i className="fas fa-list"></i>
                <span>{subscription.features}</span>
              </div>
              <p className="card-price">${subscription.price} USD</p>
            </div>
            <button className="card-button" onClick={() => paymentHandler(subscription._id)} >Subscribe now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
