const UserCard = ({user, swipe, reject}) => {
  return (
    <div className='userCard'>
      <img id='cardImg' src={user.profile_picture} />
      <h1 id='cardName'>{user.name}</h1>
      <h2 id='cardAge'>Age: {user.age}</h2>
      <h3 id='cardLocation'>Location: {user.location}</h3>
      <p id='cardBio'>{user.bio}</p>
      <div>
          <button name='yes' className='modalbutton' style={{color:'green', fontSize: '2rem'}} onClick={swipe} >✔</button>
          <button name='no' className='modalbutton' style={{color:'red', fontSize: '2rem'}} onClick={reject}>✗</button>
        </div>
    </div>
  )
}

export default UserCard;