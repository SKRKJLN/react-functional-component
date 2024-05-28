import React, { useState, useEffect, useRef } from 'react';

const UserData = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const intervalIdRef = useRef(null);

  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  useEffect(() => {
    fetchUserData();
    intervalIdRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
