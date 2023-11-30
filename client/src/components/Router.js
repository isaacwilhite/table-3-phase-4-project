import { Routes, Route } from "react-router-dom";
import Title from './Title';
import Signup from './Signup';
import Login from './Login';
import UserHome from './UserHome';
import MeetUsers from './MeetUsers';
import Interests from './Interests';
import Connections from './Connections';
import Messages from './Messages';
import Events from './Events';
import Profile from './Profile';
import Error from './Error';
import NewProfile from "./NewProfile";
import UsersNearMe from "./UsersNearMe";

function Router() {
  const routes = (
    <>
      <Route path='/' element={<Title/>} />,
      <Route path='/login' element={<Login/>} />,
      <Route path='/signup' element={<Signup/>} />,
      <Route path='/userhome' element={<UserHome/>} />,
      <Route path='/meetusers' element={<MeetUsers/>} />,
      <Route path='interests' element={<Interests/>} />,
      <Route path='/connections' element={<Connections/>} />,
      <Route path='/messages' element={<Messages/>} />,
      <Route path='/events' element={<Events/>} />,
      <Route path='/newprofile' element={<NewProfile/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/usersnearme' element={<UsersNearMe/>} />
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