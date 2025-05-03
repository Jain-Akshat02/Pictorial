import {Button,Container,Flex,Link,Text,HStack,VStack,Drawer,useDisclosure,Image} from "@chakra-ui/react";
import React from "react";
import { IoMdPhotos } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useColorModeValue, useColorMode } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import Profile from "./ProfileCard.jsx";
import DarkModeLogo from '../components/ui/DarkModeLogo.png'
import LightModeLogo from '../components/ui/LightModeLogo.png'
import { CiUser } from "react-icons/ci";


const Navbar = ({ isLoggedIn, setShowProfile }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.100", "slate.700");
  const textColor = useColorModeValue("black", "white");

  const MobileMenu = () =>(
    <VStack spacing={4} align="stretch" p={4}>
      <Button 
        LeftIcon={<CiSquarePlus />}
        variant="ghost"
        onClick={() => navigate("/create")}
        justifyContent="flex-start"
        >
          Create
        </Button>
        <Button 
          LeftIcon={colorMode === "dark" ? <IoSunnyOutline /> : <IoSunny />}
          variant="ghost"
          onClick={toggleColorMode}
          justifyContent="flex-start"
          >
            {colorMode === "dark" ? "Light" : "Dark"}
          </Button>
          {isLoggedIn ? (
        <Button
          variant="ghost"
          onClick={() => {
            setShowProfile(true);
            onClose();
          }}
          justifyContent="flex-start"
        >
          Profile
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => {
            navigate("/signup");
            onClose();
          }}
          justifyContent="flex-start"
        >
          Sign Up
        </Button>
      )}
    </VStack>
  )



  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1270px"}
      p={4}
      bg={bgColor} // Dynamic background color
      color={textColor}
      position="sticky"
      top={0}
      zIndex={1}
      boxShadow="sm"
    >
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        flexDir={"row"}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textAlign={"center"}
          color={"blue.400"}
          fontFamily={"sans-serif"}
          _hover={{transform: "scale(1.05)", transition: "transform 0.2s"}}
        >
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }} display="flex" alignItems="center">
          <Image
              src={colorMode === "dark" ? DarkModeLogo : LightModeLogo}
              borderRadius="full"
              alt="PiCTORIAL Logo"
              height="auto"
              width="70px"
              mr={2}
              objectFit="contain"
            />
          </Link>
        </Text>
        {/* Desktop Menu */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <Button
            color={colorMode === "dark" ? "black" : "white"}
            size={"sm"}
            onClick={() => navigate("/create")}
          >
            <CiSquarePlus style={{ width: "25px", height: "25px" }} />
          </Button>
          <Button
            color={colorMode === "dark" ? "black" : "white"}
            size={"sm"}
            onClick={toggleColorMode}
          >
            {colorMode === "dark" ? (
              <IoSunnyOutline style={{ width: "25px", height: "25px" }} />
            ) : (
              <IoSunny style={{ width: "25px", height: "25px" }} />
            )}
          </Button>

          {isLoggedIn ? (
            <Button onClick={() => setShowProfile(true)}
            variant="ghost"
            ><CiUser /></Button>
          ) : (
            <Button onClick={() => navigate("/signup")}>SignUp</Button>
          )}
        </HStack>

        {/* Mobile Menu */}
        {/* <RxHamburgerMenu /> */}

        
      </Flex>
      {/* Drawer */}
      {/* <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <MobileMenu />
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}

<Drawer.Root>
  <Drawer.Backdrop />
  <Drawer.Trigger />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.CloseTrigger />
      <Drawer.Header>
        <MobileMenu />
      </Drawer.Header>
      <Drawer.Body />
      <Drawer.Footer />
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
    </Container>
  );
};

export default Navbar;
