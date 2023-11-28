const Header = ({title}) => {
  return (
    <div className='header'>
      <h1>{title}</h1>
      <button id='logout'>LOGOUT</button>
    </div>
  )
}

export default Header