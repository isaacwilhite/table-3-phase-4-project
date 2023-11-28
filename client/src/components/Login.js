const Login = () => {
  return (
    <div className='modal'>
      <h1 className='modaltitle'>Login</h1>
      <h3 className='modaltag'>Please enter your email and password.</h3>
      <input id='email' className='loginInput' type='text' placeholder="Enter Email"></input>
      <input id='pass' className='loginInput' type='text' placeholder="Enter Password"></input>
      <div>
        <button className='modalbutton'>Login</button>
      </div>
    </div>
  )
}

export default Login;