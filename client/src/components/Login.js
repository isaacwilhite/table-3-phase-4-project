import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import AlertBar from './AlertBar'

const Login = () => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [alertMessage, setAlertMessage] = useState(null);
  const [snackType, setSnackType] = useState('');

  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required("Please enter an email."),
    password: yup.string().required("Please enter a password.").min(5)
  })
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem('user_active', 'true')
          navigate('/userhome') 
        } else {
          alert('Invalid login data.')
        }
      })
    }
  })

  return (
    <div className='modal'>
      <form onSubmit={formik.handleSubmit} id='formikLogin'>
        <h1 className='modaltitle'>Login</h1>
        <h3 className='modaltag'>Please enter your email and password.</h3>
        <input id='email' className='loginInput' type='text' onChange={formik.handleChange} value={formik.values.email} placeholder="Enter Email"></input>
        <input id='password' className='loginInput' type='password' onChange={formik.handleChange} value={formik.values.password} placeholder="Enter Password"></input>
        <div id='loginButtons'>
          <button className='modalbutton' type='submit'>Login</button>
          <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>

  const handleLogin = () => {
    const data = {
      "email": email,
      "password": pass
    };

    fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.ok) {
        localStorage.setItem('user_active', 'true');
        navigate('/userhome');
      } else {
        // Display an error message using the AlertBar
        setAlertMessage('Invalid user credentials.');
        setSnackType('error');
      }
    })
    .catch((error) => {
      // Handle other errors (e.g., network issues)
      console.error('Login failed:', error);
      setAlertMessage('Login failed. Please try again.');
      setSnackType('error');
    });
  };

  return (
    <div className='modal'>
      
      <h1 className='modaltitle'>Login</h1>
      <h3 className='modaltag'>Please enter your email and password.</h3>
      <input id='email_input' className='loginInput' type='text' onChange={handleChange}placeholder="Enter Email"></input>
      <input id='pass_input' className='loginInput' type='password' onChange={handleChange}placeholder="Enter Password"></input>
      <div>
        <button className='modalbutton' onClick={handleLogin}>Login</button>
        <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
        {alertMessage && (
        <AlertBar
          message={alertMessage}
          setAlertMessage={setAlertMessage}
          snackType={snackType}
          handleSnackType={setSnackType}
        />
      )}
      </div>
      </form>
    </div>  
  )
}

export default Login;