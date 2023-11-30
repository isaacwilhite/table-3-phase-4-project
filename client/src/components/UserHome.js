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

  const handleDelete = () => {
    const choice = prompt('Are you sure? There is no coming back from this!\nType YES to continue.')
    if (!choice) {
      return
    } else if (choice.toLowerCase() == 'yes') {
      const id = currentUser.id
      fetch(`/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(() => alert('Account deleted! We wish you the best.'))
      .then(() => {
        fetch('/logout')
        navigate('/')
      })
    }
  }

  const title = 'USER HOME'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>{currentUser.name}'s Datesmith Homepage</h1>
        <img className='picture' src={currentUser.profile_picture} alt='user_photo'></img>
        <h2>Age: {currentUser.age}</h2>
        <h3>Gender: {currentUser.gender}</h3>
        <h3>Location: {currentUser.location}</h3>
        <p>{currentUser.bio}</p>
        <button id='deleteProfile' onClick={handleDelete}>DELETE MY PROFILE</button>
      </div>
    </div>
  )
}

export default UserHome;