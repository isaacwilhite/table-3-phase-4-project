import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik'
import * as yup from 'yup'

const Signup = () => {
  const navigate = useNavigate()
  
  // const [email, setEmail] = useState('')
  // const [pass, setPass] = useState('')
  // const [confirmPass, setConfirmPass] = useState('')
  const [newUser, setNewUser] = useState({})



  const formSchema = yup.object().shape({
    email: yup.string().required('Please enter your email').typeError('Please enter a string.'),
    password: yup.string().required('Please enter a password.').typeError('Please enter a string.'),
    confirmpassword: yup.string().required('Please enter the same password.').typeError('Please enter a string.'), 
  })

const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
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
          return alert("Could not create user")
      } 
    })
      .then(data => {
        setNewUser(data)
        localStorage.setItem('user_active', 'true');
        navigate("/userhome")
        
      })
    }
  }) 

  // const handleChange = (e) => {
  //   if (e.target.id == 'email_input') {
  //     setEmail(e.target.value)
  //     console.log(email)
  //   } else if (e.target.id == 'pass_input') {
  //     setPass(e.target.value)
  //     console.log(pass)
  //   } else if (e.target.id == 'confirm_pass') {
  //     setConfirmPass(e.target.value)
  //     console.log(confirmPass)
  //   }
  // }

  // const handleCreate = () => {
  //   if (pass !== confirmPass) {
  //     alert("Passwords do not match.");
  //     return;
  //   }
  
  //   // Additional password requirements checks go here
  
  //   const data = {
  //     email: email,
  //     password: pass,
  //   };
  
  //   fetch(`/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error(`Failed to create account. Status: ${res.status}`);
  //       }
  //     })
  //     .then((userData) => {
  //       localStorage.setItem('user_active', 'true');
  //       localStorage.setItem('current_user', userData.id);
  //       console.log('User ID stored in local storage:', userData.id);
  //       navigate('/userhome');
  //     })
  //     .catch((error) => {
  //       console.error('Error creating account:', error.message);
  //       // Handle the error (e.g., display an error message to the user)
  //     });
  // };
  

  const handleInputChange = (e) => {
    const trimmedValue = e.target.value.trim();
    formik.handleChange(e);
    formik.setFieldValue(e.target.name, trimmedValue);
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
        <div>
          <button className='modalbutton' type='submit'>Sign Up</button>
          <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );

}

export default Signup;