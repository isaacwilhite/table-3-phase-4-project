import NavBar from './NavBar'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useEffect , useState } from 'react'

const Connections = () => {
  const navigate = useNavigate()
  const [mutualSwipes, setMutualSwipes] = useState([])
  const [mappedData, setMappedData] = useState([])

  useEffect(() => {
    if (localStorage.getItem('user_active') == 'false') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    fetch('/mutualswipes')
      .then(res => res.json())
      .then(data => {
        setMutualSwipes(data)
        console.log(data)
      })
  }, [])

  const mapped = mutualSwipes.map((item, idx) => {
    return <img key={idx} src={item.profile_picture} className='userTile'></img>
  })
  
  const title = 'CONNECTIONS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <div id='userTiles'>
          {mapped}
        </div>
      </div>
    </div>
  )
}

export default Connections;