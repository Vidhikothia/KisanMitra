import React, { useEffect, useState } from 'react';
import './Subscription.css'; // Optional for styling

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/subscription/my-subscriptions', {
          method: 'GET',
          credentials: 'include', // ✅ Sends cookies (important!)
        });

        const data = await response.json();
        console.log("Fetched subscriptions:", data);
        setSubscriptions(data.subscriptions || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="subscription-page">
      <h2>📚 My Subscribed Educators</h2>

      {subscriptions.length === 0 ? (
        <p>You have not subscribed to any educator.</p>
      ) : (
        <div className="subscription-list">
          {subscriptions.map((sub) => (
            <div key={sub._id} className="subscription-card">
              <h3>{sub.educator_id?.user_id?.username || 'Unknown Educator'}</h3>
              <p>Email: {sub.educator_id?.user_id?.email || 'N/A'}</p>
              <p>Status: {sub.status}</p>
              <p>Subscribed on: {new Date(sub.subscribed_at).toLocaleDateString()}</p>
              {sub.unsubscribed_at && (
                <p>Unsubscribed on: {new Date(sub.unsubscribed_at).toLocaleDateString()}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscription;
