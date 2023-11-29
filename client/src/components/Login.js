import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const fetchUrl = 'http://127.0.0.1:5000'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleChange = (e) => {
    if (e.target.id == 'email_input') {
      setEmail(e.target.value)
      console.log(email)
    } else if (e.target.id == 'pass_input') {
      setPass(e.target.value)
      console.log(pass)
    }
  }

  const handleLogin = () => {
    const data = {
      "email": email,
      "password": pass
    }
    fetch(`${fetchUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        localStorage.setItem('user_active', 'true')
        navigate('/userhome')  
      } else {
        alert('Invalid user credentials.')
      }
    })
  }

  return (
    <div className='modal'>
      <h1 className='modaltitle'>Login</h1>
      <h3 className='modaltag'>Please enter your email and password.</h3>
      <input id='email_input' className='loginInput' type='text' onChange={handleChange}placeholder="Enter Email"></input>
      <input id='pass_input' className='loginInput' type='password' onChange={handleChange}placeholder="Enter Password"></input>
      <div>
        <button className='modalbutton' onClick={handleLogin}>Login</button>
        <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  )
}

export default Login;