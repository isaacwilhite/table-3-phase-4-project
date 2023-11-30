import NavBar from './NavBar'
import Header from './Header'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
  const title = "MY EVENTS"
  const navigate = useNavigate()
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    fetch(`/current`)
      .then(res => res.json())
      .then(data => {
        fetch(`/events/${data.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }, 
        })
        .then(res => res.json())
        .then(data => setAllEvents(data))
      })
  }, [])

  const handleDelete = (e) => {
    fetch(`/events/${e.target.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => navigate('/myevents'))
  }

  const eventCards = allEvents.map((item, idx) => {
    return (
      <div className='eventCard'>
        <h2 id='eventName'>{item.name}</h2>
        <h4 id='eventDate'>{item.date}</h4>
        <h3 id='eventTime'>{item.time}</h3>
        <h3 id='eventLocation'>{item.location}</h3>
        <p id='eventDetails'>{item.details}</p>
        <div>
          <button onClick={handleDelete} id={item.id} className='modalbutton' style={{color:'red', fontSize: '2rem'}}>✗</button>
        </div>
    </div>
    )
  })

  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='eventContent'>
        {eventCards}
      </div>
    </div>
  )
}

export default MyEvents;