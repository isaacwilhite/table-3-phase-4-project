import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
      alert("Passwords do not match.");
      return;
    }
  
    // Additional password requirements checks go here
  
    const data = {
      email: email,
      password: pass,
    };
  
    fetch(`/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Failed to create account. Status: ${res.status}`);
        }
      })
      .then((userData) => {
        localStorage.setItem('user_active', 'true');
        localStorage.setItem('current_user', userData.id);
        console.log('User ID stored in local storage:', userData.id);
        navigate('/userhome');
      })
      .catch((error) => {
        console.error('Error creating account:', error.message);
        // Handle the error (e.g., display an error message to the user)
      });
  };
  

  return (
    <div className='modal'>
      <h1 className='modaltitle'>Register New User</h1>
      <h3 className='modaltag'>Please enter your email and password.</h3>
      <input id='email_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Email"></input>
      <input id='pass_input' className='loginInput' type='password' onChange={handleChange} placeholder="Enter Password"></input>
      <input id='confirm_pass' className='loginInput' type='password' onChange={handleChange} placeholder="Confirm Password"></input>
      <div id='loginButtons'>
        <button className='modalbutton' onClick={handleCreate}>Sign Up</button>
        <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
      </div>
    </div>
  )
}

export default Signup;