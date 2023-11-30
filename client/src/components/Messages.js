import NavBar from './NavBar'
import Header from './Header'
import Chat from './Chat'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Messages = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);
  
  const title = 'MESSAGES'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>
          <Chat />
        </h1>
      </div>
    </div>
  )
}

export default Messages;