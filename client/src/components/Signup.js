const Signup = () => {
  return (
    <div className='modal'>
      <h1 className='modaltitle'>Register New User</h1>
      <h3 className='modaltag'>Please enter your email and password.</h3>
      <input id='email' className='loginInput' type='text' placeholder="Enter Email"></input>
      <input id='pass' className='loginInput' type='text' placeholder="Enter Password"></input>
      <input id='confirmPass' className='loginInput' type='text' placeholder="Confirm Password"></input>
      <div>
        <button className='modalbutton'>Sign Up</button>
      </div>
    </div>
  )
}

export default Signup;