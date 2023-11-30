import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'


const Profile = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    fetch(`/current`)
      .then(res => res.json())
      .then(data => setCurrentUser(data))
  }, [])

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [bio, setBio] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleChange = (e) => {
    if (e.target.id == 'name_input') {
      setName(e.target.value)
    } else if (e.target.id == 'age_input') {
      setAge(e.target.value)
    } else if (e.target.id == 'zipcode_input') {
      setZipcode(e.target.value)
    } else if (e.target.id == 'bio_input') {
      setBio(e.target.value)
    } else if (e.target.id == 'photo_input') {
      setImageUrl(e.target.value)
    }
  }

  const handleUpdate = (e) => {
    const id = currentUser.id
    const data = {
      "name": name,
      "age": +age,
      "zipcode": zipcode,
      "bio": bio,
      "profile_picture": imageUrl
    }
    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const title = 'YOUR PROFILE'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <div className='modal' id='profileModal'>
          <h1 className='modaltitle'>Update Profile!</h1>
          <h3 className='modaltag'>Please enter your information</h3>
          <form id='profileForm'>
            <label htmlFor='name_input'>Name:</label>
            <input id='name_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Name"></input>
            <label htmlFor='age_input'>Age:</label>
            <input id='age_input' className='loginInput' type='number' onChange={handleChange} placeholder="Enter Age"></input>
            <label htmlFor='zipcode_input'>Zipcode:</label>
            <input id='zipcode_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Zip Code"></input>
            <label htmlFor='bio_input'>Bio:</label>
            <input id='bio_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Bio"></input>
            <label htmlFor='photo_input'>Photo:</label>
            <input id='photo_input' className='loginInput' type='text' onChange={handleChange} placeholder="Enter Image URL"></input>
          </form>
          <div>
            <button className='modalbutton' onClick={() => navigate('/')}>Cancel</button>
            <button className='modalbutton' onClick={handleUpdate}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;