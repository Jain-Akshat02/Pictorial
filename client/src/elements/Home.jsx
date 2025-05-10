import React, {useEffect, useState} from 'react'
import AllImages from '../PhotoStore/allImages';
import LandingPage from './landingPage';
import { useColorModeValue } from '../components/ui/color-mode';
import useScreenSize from './useScreenSize';
import LandingPageM from './landingPageM';
const Home = () => {
  const isMobile = useScreenSize(768);
 return (
    <>
    {isMobile ? (
        <LandingPageM /> // Render mobile version if isMobile is true
      ) : (
        <LandingPage /> // Render desktop version otherwise
      )}

      <AllImages /> // Render all images component
    </>
    
  )
}

export default Home