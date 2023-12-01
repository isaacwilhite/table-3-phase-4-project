import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const navigate = useNavigate()
  
  // const [email, setEmail] = useState('')
  // const [pass, setPass] = useState('')

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
      </div>
      </form>
    </div>  
  )
}

export default Login;