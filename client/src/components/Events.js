import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import GoogleMapsComponent from './GoogleMapsComponent'

const Events = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);
  
  const title = 'EVENTS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      
      <div className='content'>
        <h1>Content goes here.</h1>
        <GoogleMapsComponent/>
      </div>
    </div>
  )
}

export default Events;