import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'
import AlertBar from './AlertBar'

const Signup = () => {
  const navigate = useNavigate()
  
  

  const [newUser, setNewUser] = useState({})
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  

  useEffect(() => {
    setSnackbarOpen(false)
  }, [])

  const formSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').typeError('Please enter a string.'),
    password: yup.string().required('Please enter a password.').typeError('Please enter a string.'),
    confirmpassword: yup.string().required('Please enter the same password.').typeError('Please enter a string.'), 
  })

const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmpassword) {
          setSnackbarMessage('Password must match.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
          return
      }
      await fetch('/signup', {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(values, null, 2),
      })
      .then(res => {
        if (res.status === 201) res.json()
        else {
          setSnackbarMessage('User cannot be created.');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
      } 

    })
      .then(data => {
        setNewUser(data)
        localStorage.setItem('user_active', 'true');
        navigate("/userhome")
        
      })

    }
  }) 


  

  const handleInputChange = (e) => {
    const trimmedValue = e.target.value.trim();
    formik.handleChange(e);
    formik.setFieldValue(e.target.name, trimmedValue);

  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  return (
    <div className='modal'>

      <form id='signupForm' onSubmit={formik.handleSubmit}>
        <h1 className='modaltitle'>Register New User</h1>
        <h3 className='modaltag'>Please enter your email and password.</h3>
        <div className='signupInput'>
        <input className='signup'
          id='email'
          name="email"
          onChange={handleInputChange}
          value={formik.values.email}
          placeholder="Enter Email"
          required="true"
        />
        <input className='signup'
          id='password'
          name="password"
          type="password"
          onChange={handleInputChange}
          value={formik.values.password}
          placeholder="Enter Password"
          required="true"
        />
        <input className='signup'
          id='confirmpassword'
          name="confirmpassword"
          type="password"
          onChange={handleInputChange}
          value={formik.values.confirmpassword}
          placeholder="Confirm Password"
          required="true"
        />
        </div>
        <div id='loginButtons'>
          <button className='modalbutton' type='submit'>Sign Up</button>
          <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
          <AlertBar
          message={snackbarMessage}
          setAlertMessage={setSnackbarMessage}
          snackType={snackbarSeverity}
          handleSnackType={setSnackbarSeverity}
          onClose={handleCloseSnackbar}
      />
        </div>
      </form>
      </div>
  );

}

export default Signup;