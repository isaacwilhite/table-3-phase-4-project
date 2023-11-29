import { useNavigate } from 'react-router-dom';

const fetchUrl = 'http://127.0.0.1:5000'

const Header = ({title}) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch(`${fetchUrl}/logout`)
      .then(() => {
        localStorage.setItem('user_active', 'false')
        navigate('/')
      })
  }
  return (
    <div className='header'>
      <h1>{title}</h1>
      <button id='logout' onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default Header