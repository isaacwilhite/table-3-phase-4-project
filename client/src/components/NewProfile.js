import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const fetchUrl = 'http://127.0.0.1:5555'

const NewProfile = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [bio, setBio] = useState('')

  const handleChange = (e) => {
    if (e.target.id == 'name_input') {
      setName(e.target.value)
      console.log(name)
    } else if (e.target.id == 'age_input') {
      setAge(e.target.value)
      console.log(age)
    } else if (e.target.id == 'zipcode_input') {
      setZipcode(e.target.value)
      console.log(zipcode)
    }  else if (e.target.id == 'bio_input') {
      setBio(e.target.value)
      console.log(bio)
    }
  }

  const getUserId = async () => {
    fetch('/active-user')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the data
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
  console.log(getUserId())

  const handleCreate = () => {
    // if (pass !== confirmPass) {
    //   alert("Passwords do not match.")
    //   return
    // }
    const data = {
      "name":name,
      "age":age,
      "location":zipcode,
      "bio":bio,
    }
    fetch(`${fetchUrl}/update_user/<int:id>`, {
      method: 'PATCH',
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
      <h1 className='modaltitle'>Create Profile!</h1>
      <h3 className='modaltag'>Please enter your information</h3>
      <input id='name_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Name"></input>
      <input id='age_input' className='loginInput' type='number' onChange={handleChange} placeholder="Enter Age"></input>
      <input id='zipcode_input' className='loginInput' type='type' onChange={handleChange} placeholder="Enter Zip Code"></input>
      <input id='bio_input' className='loginInput' type='type' onChange={handleChange} placeholder="Enter Bio"></input>
      <div>
        <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
        <button className='modalbutton' onClick={handleCreate}>Next</button>
      </div>
    </div>
  );
 };
}

export default NewProfile;