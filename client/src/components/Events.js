import NavBar from './NavBar'
import Header from './Header'

const Events = () => {
  const title = 'EVENTS'
  return (
    <div className='container'>
      <Header title={title} />
      <NavBar />
      <div className='content'>
        <h1>Content goes here.</h1>
      </div>
    </div>
  )
}

export default Events;