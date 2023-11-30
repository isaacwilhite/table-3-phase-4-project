import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import MeetUsersGM from './MeetUserGM'

const MeetUsers = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);
  
  const title = 'MEET USERS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>Content goes here.</h1>
        <MeetUsersGM />
      </div>
    </div>
  )
}

export default MeetUsers;