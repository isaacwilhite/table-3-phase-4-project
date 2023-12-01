import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><NavLink to='/userhome'>Home</NavLink></li>
        <li><NavLink to='/profile'>Profile</NavLink></li>
        <li><NavLink to='/connections'>Connections</NavLink></li>
        <li><NavLink to='/meetusers'>Meet Users</NavLink></li>
        <li><NavLink to='/usersnearme'>Map of Users</NavLink></li>
        <li><NavLink to='/createevent'>Create Event</NavLink></li>
        <li><NavLink to='/myevents'>My Events</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavBar;