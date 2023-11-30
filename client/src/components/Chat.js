import React, { useState, useEffect } from 'react';
import { useSocket } from './socket';  // Implement this hook to manage Socket.IO connection

const Chat = ({ user, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socket = useSocket("/");

    useEffect(() => {

        fetch(`/messages/${user.id}`)
            .then(response => response.json())
            .then(data => {
              console.log('Messages data:', data); // Log messages data
              setMessages(data.messages);
            })
            .catch(error => console.error('Error fetching messages:', error));


            socket.on('new_message', ({ message }) => {
              console.log('New message received:', message);
              setMessages(prevMessages => [...prevMessages, message]);
            });

    return () => {
        socket.off('new_message');
    };
  }, [user.id, receiverId, socket]);

  const sendMessage = () => {
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: user.id,
        receiver_id: receiverId,
        content: newMessage,
      }),
    })
      .then(response => response.json())
      .then(() => setNewMessage(''))
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>{message.content}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;