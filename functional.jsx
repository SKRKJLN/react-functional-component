import React, { useState, useEffect, useRef } from 'react';

const UserData = ({ userId }) => {
  // Initializing state variables
  const [user, setUser] = useState(null); // store user data
  const [seconds, setSeconds] = useState(0); // store the timer value
  const intervalIdRef = useRef(null); // Ref to store the interval ID

  // Function to fetch user data from the API
  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  // Method componentDidMount & componentWillUnmount
  useEffect(() => {
    // Method componentDidMount => runs once when the component mounts and cleans up when it unmounts
    fetchUserData(); // Fetch user data when the component mounts
    intervalIdRef.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000); // Set Interval to update timer in seconds

    // Method componentWillUnmount
    return () => {
      clearInterval(intervalIdRef.current); // Clear the interval
    };
  }, []); // Empty dependency array so it runs only once when the component mounts

  // Method componentDidUpdate => fetch user data when userId changes
  useEffect(() => {
    fetchUserData(); // Fetch new user data when userId changes
  }, [userId]); // ensures this effect runs whenever userId changes

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
