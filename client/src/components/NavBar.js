const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><a href='/userhome'>Home</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li><a href='/connections'>Connections</a></li>
        <li><a href='/meetusers'>Meet Users</a></li>
        <li><a href='/usersnearme'>Map of Users</a></li>
        <li><a href='/createevent'>Create Event</a></li>
        <li><a href='/myevents'>My Events</a></li>
      </ul>
    </nav>
  )
}

export default NavBar;