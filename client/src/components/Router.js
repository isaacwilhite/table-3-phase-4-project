import { Routes, Route } from "react-router-dom";
import Title from './Title';
import Signup from './Signup';
import Login from './Login';
import UserHome from './UserHome';
import MeetUsers from './MeetUsers';
import Connections from './Connections';
import Events from './Events';
import Profile from './Profile';
import Error from './Error';

function Router() {
  const routes = (
    <>
      <Route path='/' element={<Title/>} />,
      <Route path='/login' element={<Login/>} />,
      <Route path='/signup' element={<Signup/>} />,
      <Route path='/userhome' element={<UserHome/>} />,
      <Route path='/meetusers' element={<MeetUsers/>} />,
      <Route path='/connections' element={<Connections/>} />,
      <Route path='/events' element={<Events/>} />,
      <Route path='/profile' element={<Profile/>} />
    </>
  )
  return (
    <>
      <Routes>
        {routes}
        <Route path="/:error" element={<Error />} />
      </Routes>
    </>
  )
}

export default Router;