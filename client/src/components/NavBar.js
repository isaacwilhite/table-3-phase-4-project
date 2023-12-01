import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
<<<<<<< HEAD
        <li><NavLink to='/userhome'>Home</NavLink></li>
        <li><NavLink to='/profile'>Profile</NavLink></li>
        <li><NavLink to='/connections'>Connection</NavLink></li>
        <li><NavLink to='/meetusers'>Meet User</NavLink></li>
        <li><NavLink to='/createevent'>Create Event</NavLink></li>
        <li><NavLink to='/myevents'>My Events</NavLink></li>
=======
        <li><a href='/userhome'>Home</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li><a href='/connections'>Connections</a></li>
        <li><a href='/meetusers'>Meet Users</a></li>
        <li><a href='/usersnearme'>Map of Users</a></li>
        <li><a href='/createevent'>Create Event</a></li>
        <li><a href='/myevents'>My Events</a></li>
>>>>>>> main
      </ul>
    </nav>
  )
}

export default NavBar;