import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const fetchUrl = 'http://127.0.0.1:5000'

const Signup = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleChange = (e) => {
    if (e.target.id == 'email_input') {
      setEmail(e.target.value)
      console.log(email)
    } else if (e.target.id == 'pass_input') {
      setPass(e.target.value)
      console.log(pass)
    } else if (e.target.id == 'confirm_pass') {
      setConfirmPass(e.target.value)
      console.log(confirmPass)
    }
  }

  const handleCreate = () => {
    if (pass !== confirmPass) {
      alert("Passwords do not match.")
      return
    }
    const data = {
      "email": email,
      "password": pass
    }
    fetch(`${fetchUrl}/signup`, {
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
      }
    })
  }

  return (
    <div className='modal'>
      <h1 className='modaltitle'>Register New User</h1>
      <h3 className='modaltag'>Please enter your email and password.</h3>
      <input id='email_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Email"></input>
      <input id='pass_input' className='loginInput' type='password' onChange={handleChange} placeholder="Enter Password"></input>
      <input id='confirm_pass' className='loginInput' type='password' onChange={handleChange} placeholder="Confirm Password"></input>
      <div>
        <button className='modalbutton' onClick={handleCreate}>Sign Up</button>
        <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  )
}

export default Signup;