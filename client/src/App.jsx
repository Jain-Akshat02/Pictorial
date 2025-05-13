import React, {useState, useEffect} from 'react';
import Home from './elements/Home.jsx';
import { Routes,Route } from 'react-router-dom';
import Navbar from './elements/Navbar.jsx'
import { Box } from '@chakra-ui/react';
import CreatePage from './elements/CreatePage.jsx';
import { useColorModeValue } from './components/ui/color-mode.jsx';
import Login from "./userAuthPages/Login.jsx"
import Signup from './userAuthPages/Signup.jsx';
import ProfileCard from './elements/ProfileCard.jsx';
import ReachOut from './elements/ReachOut.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
   const [reachOut, setReachOut] = React.useState(false);

  useEffect(()=>{
    const jwtToken = localStorage.getItem("jwtToken");
    const user = localStorage.getItem("userInfo");
    if(jwtToken && user){
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(user));
    }
  }, []);

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "slate.900")} color={useColorModeValue("gray.900", "gray.100")} >
      
      <Navbar isLoggedIn={isLoggedIn} setShowProfile={setShowProfile}/>
      <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/create" element={<CreatePage/>} /> 
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo}/>} />
          <Route path="/signup" element={<Signup/>} />
      </Routes>
      {showProfile && (
        <ProfileCard
          userInfo={userInfo}
          onClose={() => setShowProfile(false)}
          setReachOut={setReachOut}
        />
      )}
      {
        reachOut && (
          <ReachOut
            // userInfo={userInfo}
            // onClose={() => setReachOut(false)}
          />
        )
      }
    </Box>
  )

}

export default App
