import {
  Button,
  Container,
  Flex,
  Link,
  Text,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { IoMdPhotos } from "react-icons/io";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useColorMode } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import { PiHamburger } from "react-icons/pi";
import Profile from "./ProfileCard.jsx";

const Navbar = ({ isLoggedIn, setShowProfile }) => {
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW={"1270px"}
      p={4}
      bg={colorMode === "dark" ? "slate.700" : "gray.100"} // Dynamic background color
      color={colorMode === "dark" ? "white" : "black"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        flexDir={{
          base: "row", //for mobile
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          // textTransform="uppercase"
          textAlign={"center"}
          color={"blue.400"}
          fontFamily={"sans-serif"}
        >
          <Link href="/" style={{ color: "inherit" }}>
            PiCTORIAL
            <IoMdPhotos
              style={{ width: "28px", height: "28px", color: "inherit" }}
            />{" "}
          </Link>
        </Text>
        
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
            <Button onClick={() => setShowProfile(true)}>Profile</Button>
          ) : (
            <Button onClick={() => navigate("/signup")}>SignUp</Button>
          )}
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
