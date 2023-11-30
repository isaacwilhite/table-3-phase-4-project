import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

const CreateEvent = () => {
  const navigate = useNavigate()
  const [mutualSwipes, setMutualSwipes] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [invitedId, setInvitedId] = useState('')
  const [newEvent, setNewEvent] = useState('')

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

  const formSchema = yup.object().shape({
    name: yup.string().required('Please enter a name for your event.').typeError('Please enter a string.'),
    date: yup.string().required('Please enter a date in MM/DD/YYYY format.'),
    time: yup.string().required('Please enter a time for your event.'),
    location: yup.string().required('Please enter an address or location for your event.'),
    details: yup.string().required('Please enter some details about your event.').typeError('This must be a string.').max(200)
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      time: "",
      location: "",
      details: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/events', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(values, null, 2),
      })
      .then(res => res.json())
      .then(data => {
        setNewEvent(data)
        fetch('/connections', {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            "user_id": currentUser.id,
            "event_id": newEvent.id
          })
        })
        .then(() => {
          fetch('/connections', {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({
              "user_id": +invitedId,
              "event_id": newEvent.id
            })
          })
          .catch(e => console.log(e))
        })
      })
    }
  })
  
  useEffect(() => {
    fetch('/mutualswipes')
      .then(res => res.json())
      .then(data => {
        setMutualSwipes(data)
      })
  }, [])

  const handleSetGuest = (e) => {
    const id = e.target.id
    document.querySelectorAll('.eventTile').forEach(item => {
      item.classList.remove('selected')
    })
    e.target.classList.add('selected')
    setInvitedId(id)
  }

  const mapped = mutualSwipes.map((item, idx) => {
    return <img id={item.id} key={idx} src={item.profile_picture} className='eventTile' onClick={handleSetGuest}></img>
  })
  

  const title = 'EVENTS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <div id='userTiles'>
          <h2>Create an event for you and your new connection!</h2>
          {mapped}
          <form id='eventForm' onSubmit={formik.handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
            <label htmlFor='name'>Date:</label>
            <input id='date' name='date' onChange={formik.handleChange} value={formik.values.date} />
            <label htmlFor='time'>Time:</label>
            <input id='time' name='time' onChange={formik.handleChange} value={formik.values.time} />
            <label htmlFor='location'>Location:</label>
            <input id='location' name='location' onChange={formik.handleChange} value={formik.values.location} />
            <label htmlFor='details'>Details:</label>
            <input id='details' name='details' onChange={formik.handleChange} value={formik.values.details} />
            <br/>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent;