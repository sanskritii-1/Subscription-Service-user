import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Subscription.css';
import { useSendData } from '../../helper/util';
import { useNavigate } from 'react-router-dom';
import { useSendData2 } from '../../helper/util2';
import toast from 'react-hot-toast';
import Payment from '../Payment/Payment'

const Subscriptions: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ amount: 0, planId: '', clientSecret: '' });
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const sendData = useSendData();
  const sendData2 = useSendData2();
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

      if (!selectedSubscription) {
        throw new Error('Selected subscription not found');
      }

      if (selectedSubscription.price === 0) {
        await subscribeHandler(planId);
        return;
      }
  
      const response = await sendData2("POST", "create-payment-intent", true, {
        amount: selectedSubscription.price,
        planId
      });
  
      console.log('Payment Intent response:', response);
  
      if (!response || !response.clientSecret) {
        throw new Error('Client secret not received');
      }
  
      const { clientSecret } = response;
  
      setPaymentDetails({ amount: selectedSubscription.price, planId, clientSecret });
      setModalOpen(true); 

    } catch (error) {
      console.error('Error subscribing to plan:', error);
    }
  };
  
  const subscribeHandler = async (planId: string) => {
    try {
      const resData = await sendData("POST", "/subscribe", true, {
        planId: planId,
      });
      navigate('/resources'); 
    } 
    catch (error) {
      console.log(error);
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
              <p className="card-price">Rs. {subscription.price}</p>
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
              <p className="card-price">Rs.{subscription.price} </p>
            </div>
            <button className="card-button" onClick={() => paymentHandler(subscription._id)} >Subscribe now</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Payment
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          amount={paymentDetails.amount}
          planId={paymentDetails.planId}
          clientSecret={paymentDetails.clientSecret}
        />
      )}
      
    </div>
  );
};

export default Subscriptions;
