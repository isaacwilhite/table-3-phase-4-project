import NavBar from './NavBar'
import Header from './Header'
import { useEffect, useState } from 'react'

const MyEvents = () => {
  const title = "MY EVENTS"

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

  console.log(allEvents)
  const eventCards = allEvents.map((item, idx) => {
    return (
      <div>
        <h1>PENIS</h1>
      </div>
    )
  })

  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        {eventCards}
      </div>
    </div>
  )
}

export default MyEvents;