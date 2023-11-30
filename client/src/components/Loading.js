import { useNavigate } from 'react-router-dom';


const Loading = () => {
  const navigate = useNavigate()
  setTimeout(() => navigate('/myevents'), 750)
  return (
    <h1 id='loading'>LOADING...</h1>
  )
}
export default Loading;