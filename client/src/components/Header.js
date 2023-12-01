import { useNavigate } from 'react-router-dom';
const Header = ({title}) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    fetch(`/logout`)
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