const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><a href='/userhome'>Home</a></li>
        <li><a href='/profile'>Profile</a></li>
        <li><a href='/connections'>Connections</a></li>
        <li><a href='/meetusers'>Meet Users</a></li>
        <li><a href='/events'>Events</a></li>
      </ul>
    </nav>
  )
}

export default NavBar;