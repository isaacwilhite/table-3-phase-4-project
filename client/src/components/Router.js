import { Routes, Route } from "react-router-dom";
import Title from './Title';
import Signup from './Signup';
import Login from './Login';
import UserHome from './UserHome';
import MeetUsers from './MeetUsers';
import Connections from './Connections';
import CreateEvent from './CreateEvent';
import MyEvents from './MyEvents'
import Profile from './Profile';
import Error from './Error';
import UsersNearMe from "./UsersNearMe";

import Loading from './Loading';

function Router() {
  const routes = (
    <>
      <Route path='/' element={<Title/>} />,
      <Route path='/login' element={<Login/>} />,
      <Route path='/signup' element={<Signup/>} />,
      <Route path='/userhome' element={<UserHome/>} />,
      <Route path='/meetusers' element={<MeetUsers/>} />,
      <Route path='/connections' element={<Connections/>} />,
      <Route path='/createevent' element={<CreateEvent/>} />,
      <Route path='/myevents' element={<MyEvents/>} />,
      <Route path='/profile' element={<Profile/>} />

      <Route path='/usersnearme' element={<UsersNearMe/>} />

      <Route path='/loading' element={<Loading/>} />

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