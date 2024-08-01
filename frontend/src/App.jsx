import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Make sure the path to your Login component is correct
import Signup from './components/Signup'; // Make sure the path to your Login component is correct
import Mainpage from './components/Mainpage';
import Forgetpassword from './components/Forgetpassword';
import ChatPart from './components/chat';
import { RecoilRoot } from 'recoil';
import Profile from './components/Profile';
import VideoConference from './components/Video';
import Room from './pages/Room';



function App() {
  return (
    <RecoilRoot>
<Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path='/mainpage' element={<Mainpage/>} />
        <Route path='/chat/:userid' element={<Room/>}/>
        <Route path='/profile/' element={<Profile/>}/>
      </Routes>
    </Router>
    </RecoilRoot>
   
  );
}

export default App;
