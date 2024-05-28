import React, { Component } from 'react';

class UserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      seconds: 0,
    };
  }
  
  // Lifecycle method: runs after the component is mounted
  componentDidMount() {
    this.fetchUserData();
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
    }, 1000);
  }
  
  // Lifecycle method: runs when the component updates
  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchUserData();
    }
  }
  
  // Lifecycle method: runs just before the component is unmounted
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  
  // Function to fetch user data from the API
  fetchUserData = () => {
    fetch(`https://secret.url/user/${this.props.userId}`)
      .then(response => response.json())
      .then(data => this.setState({ user: data }))
      .catch(error => console.error('Error fetching user data:', error));
  }

  render() {
    const { user, seconds } = this.state;
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
  }
}

export default UserData;
