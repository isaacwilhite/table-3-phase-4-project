import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import NavBar from './NavBar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user')); // Retrieve current user from local storage

  useEffect(() => {
    // Fetch user connections from the API
    fetch('/user-connections', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include any authentication headers if required
      },
    })
      .then(response => response.json())
      .then(data => setConnections(data.connections))
      .catch(error => console.error('Error fetching user connections:', error));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user_active') === 'false') {
      navigate('/');
    }
  }, [navigate]);

  const title = 'USER HOME';

  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>Your Connections:</h1>
        {connections.map(connection => (
          <div key={connection.id}>
            <h2>{connection.name}</h2>
            <Chat user={currentUser} receiverId={connection.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;