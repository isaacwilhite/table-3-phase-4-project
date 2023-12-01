

import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserCard from './UserCard'

let index = 0;

const MeetUsers = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [prospects, setProspects] = useState([])
  const [currentProspect, setCurrentProspect] = useState({})
  
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
        console.log(data[index].id)
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
  
  const title = 'MEET USERS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
      <UserCard user={currentProspect} swipe={swipe} reject={reject}/>
      </div>
    </div>
  )
}

export default MeetUsers;