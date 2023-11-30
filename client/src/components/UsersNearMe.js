import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Header from './Header'
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import UserMap from './UserMap';
const UsersNearMe = () => {
  const title = "Users Map"
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [prospects, setProspects] = useState([])
  const [currentProspect, setCurrentProspect] = useState({})
  let index = 0;
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    fetch(`/current`)
      .then(res => res.json())
      .then(data => setCurrentUser(data))
      index = 0
  }, [])

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        setProspects(data)
        setCurrentProspect(data[index])
        index++
        if (index == prospects.length) index = 0
      })
  }, [])

  const swipe = (e) => {
    index++
    if (index >= prospects.length) {
      alert("That's everyone for now! Nobody is left!")
      navigate('/userhome')
    }
    fetch('/swipe', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "sender" : currentUser.id,
        "receiver" : currentProspect.id
      })
    })
    setCurrentProspect(prospects[index])
  }

  const reject = (e) => {
    setCurrentProspect(prospects[index])
    index++
    if (index == prospects.length) index = 0
  }
  return ( 
  <div className='container'>
      <Header title={title}/>
      <NavBar />
      <div className='content'>
      <UserMap users={currentProspect} swipe={swipe} reject={reject}/>
      </div>
    </div>
    )
}

export default UsersNearMe