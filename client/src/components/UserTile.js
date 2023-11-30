const UserTile = ({user}) => {
  return (
    <div className='userTile'>
      <img id='tileImg' src={user.profile_picture} />
      <h1 id='tileName'>{user.name}</h1>
      <h2 id='tileAge'>Age: {user.age}</h2>
      <h3 id='tileLocation'>Location: {user.location}</h3>
      <div>
          <button name='yes' className='modalbutton' style={{color:'green', fontSize: '2rem'}} >✔</button>
          <button name='no' className='modalbutton' style={{color:'red', fontSize: '2rem'}}>✗</button>
        </div>
    </div>
  )
}

export default UserTile;