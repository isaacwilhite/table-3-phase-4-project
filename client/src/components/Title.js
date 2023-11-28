const Title = () => {
  return (
    <div className='modal'>
      <h1 className='modaltitle'>Welcome to Datesmith!</h1>
      <h3 className='modaltag'>Please select an option:</h3>
      <div>
        <button className='modalbutton'>Login</button>
        <button className='modalbutton'>Sign Up</button>
      </div>
    </div>
  )
}

export default Title;