import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import UserCard from './UserCard'

const MeetUsers = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [prospect, setProspect] = useState({})
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    fetch(`/current`)
      .then(res => res.json())
      .then(data => setCurrentUser(data))
  }, [])

  const swipe = () => {
    alert('swiped!')
  }

  const reject = () => {
    alert('rejected!')
  }
  
  const title = 'MEET USERS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <UserCard user={currentUser} swipe={swipe} reject={reject}/>
      </div>
    </div>
  )
}

export default MeetUsers;