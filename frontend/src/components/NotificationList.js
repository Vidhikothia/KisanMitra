import React, { useEffect, useState } from 'react';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetch('http://localhost:5000/notifications', {
          credentials: 'include', // ✅ Send cookies
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetched Notifications:", data); // Debugging Log

        if (Array.isArray(data)) {
          setNotifications(data);
        } else if (data.notifications) {
          setNotifications(data.notifications);
        } else {
          console.error("Unexpected response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    getNotifications(); // ✅ Call the function here!
  }, []);

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/notifications/${id}/read`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>  🔔 Your Notifications</h2>
      <ul>
        {notifications.map((n) => (
          <li key={n._id} style={{ fontWeight: n.isRead ? 'normal' : 'bold' }}>
            {n.message}
            {!n.isRead && (
              <button onClick={() => markAsRead(n._id)}>Mark as Read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
