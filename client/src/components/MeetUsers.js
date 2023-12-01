import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import AlertBar from './AlertBar'


let index = 0

const MeetUsers = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [prospects, setProspects] = useState([])
  const [currentProspect, setCurrentProspect] = useState({})
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  
  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    fetch(`/current`)
      .then(res => res.json())
      .then(data => setCurrentUser(data))
      index = 0
  }, [])

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        setProspects(data)
        setCurrentProspect(data[index])
        index++
        if (index == prospects.length) index = 0
      })
  }, [])

  const swipe = () => {
    index++;
    if (index >= prospects.length) {
      setAlertMessage("That's everyone for now! Nobody is left!");
      setAlertSeverity('info');
      navigate('/userhome');
      return;
    }
  
    fetch('/swipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: currentUser.id,
        receiver: currentProspect.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error swiping: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        setCurrentProspect(prospects[index]);
      })
      .catch((error) => {
        setAlertMessage(`Error swiping: ${error.message}`);
        setAlertSeverity('error');
      });
  };
  

  const reject = (e) => {
    setCurrentProspect(prospects[index])
    index++
    if (index == prospects.length) index = 0
  }
  
  const title = 'MEET USERS'
  return (
    <div className='container'>
      
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <UserCard user={currentProspect} swipe={swipe} reject={reject}/>
        <AlertBar
        message={alertMessage}
        setAlertMessage={setAlertMessage}
        snackType={alertSeverity}
        handleSnackType={setAlertSeverity}
        onClose={() => setAlertMessage('')}
        open={Boolean(alertMessage)}
      />
      </div>
    </div>
  )
}

export default MeetUsers;