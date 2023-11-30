import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = '/';

const useSocket = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return socketRef.current;
};

export { useSocket };