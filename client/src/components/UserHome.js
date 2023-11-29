import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const UserHome = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);

  const title = 'USER HOME'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>Content goes here.</h1>
      </div>
    </div>
  )
}

export default UserHome;