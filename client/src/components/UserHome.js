import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserHome = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})

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

  const title = 'USER HOME'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>{currentUser.name}'s Datesmith Homepage</h1>
        <img className='picture' src={currentUser.profile_picture} alt='user_photo'></img>
        <h3>Age: {currentUser.age}</h3>
        <h3>Gender: {currentUser.gender}</h3>
        <p>{currentUser.bio}</p>
      </div>
    </div>
  )
}

export default UserHome;