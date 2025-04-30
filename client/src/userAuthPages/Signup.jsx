import { Container, Heading, VStack, Input, Button, Text } from "@chakra-ui/react";
import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toaster } from '../components/ui/toaster';
const Signup = () => {
  const navigate = useNavigate();
  // Define colors for light and dark modes
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const inputBg = useColorModeValue("gray.50", "gray.700");


  // Define the form submission handler

  const [userInfo, setUserInfo] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const signupInfo = async (e) => {
    e.preventDefault();

    // Validate user input
    const formData = new FormData();
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("username", userInfo.username);
    console.log(userInfo.username)
    console.log(userInfo.email) 
    // console.log( userInfo.password)

    if (userInfo.username === "" || userInfo.email === "" || userInfo.password === "") {
      toaster("Please fill all the fields", "error");
      return;
    } 
    if (userInfo.password.length < 6) {
      toaster.create({
              title: "Error",
              description: "atleast 6 characters long password",
              status: "error",
              key: "uploading",
            });
      return;
      
    }
    if (!userInfo.email.includes("@") && !userInfo.email.includes(".com")) {
      toaster.create({
        title: "Error",
        description: "enter a valid email address",
        status: "error",
        key: "uploading",
      });
      return;
    }
    if (userInfo.username.length < 3) {
      toaster("Username must be at least 3 characters long", "error");
      return;
    }

    toaster.create({
      title: "Please wait",
      description: "Please wait while we set up your profile.",
      status: "info",
      key: "uploading",
    });
    try {
      // Sending data to the server
      const response = await axios.post("http://localhost:5000/auth/register", {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
      });
  
      console.log("Response:", response.data);
  
      toaster.create({
        title: "Success",
        description: "Signup successful! Redirecting to login page...",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
  
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || error.response.data;
        
        if (errorMessage.includes('duplicate key') && errorMessage.includes('username')) {
          toaster.create({
            title: "Username Already Taken",
            description: "This username is already taken. Please choose another one.",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
        } else if (errorMessage === "User already exists") {
          toaster.create({
            title: "Email Already Registered",
            description: "This email is already registered. Please log in instead.",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toaster.create({
            title: "Error",
            description: errorMessage || "An error occurred during signup. Please try again.",
            status: "error",
            isClosable: true,
          });
        }
      } else {
        toaster.create({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          status: "error",
          isClosable: true,
        });
      }
    }
  }
  return (
    <Container
      maxW="md"
      py={8}
      px={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={bgColor}
    >
      <Toaster toastOptions={{
              duration: 5000,
              style: {
                background: "white",
                color: "black",
              },
              isClosable: true,
            }} />
      <Heading mb={6} textAlign="center" color="blue.500">
        Signup{" "}
      </Heading>
      <VStack spacing={4} as="form" width="100%">
        {/* Username Field */}
        <FormControl id="Username" isRequired>
          <FormLabel fontSize="lg" color="gray.700" fontWeight="bold" >
            Username
          </FormLabel>
          <Input
            type="Username"
            placeholder="Enter Username"
            size="lg"
            bg={inputBg}
            width="100%"
            onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
            value={userInfo.username}
          />
        </FormControl>
        {/* Email Field */}
        <FormControl id="email" isRequired>
          <FormLabel fontSize="lg" color="gray.700" fontWeight="bold">
            Email address
          </FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            size="lg"
            bg={inputBg}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            value={userInfo.email}
          />
          {/* <Text fontSize="sm" color="gray.500" mt={1}>
            We'll never share your email with anyone else.
          </Text> */}
        </FormControl>
        <Text fontSize="sm" color="gray.500" mt={1}>
            We'll never share your email with anyone else.
          </Text>

        {/* Password Field */}
        <FormControl id="password" isRequired>
          <FormLabel fontSize="lg" color={textColor} fontWeight="bold">
            {" "}
            Password
          </FormLabel>
          <Input
            type="password"
            placeholder="Enter password"
            size="lg"
            bg={inputBg}
            width="100%"
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            value={userInfo.password}
          />
          
        </FormControl>
        <Text fontSize="sm" color="gray.500" mt={1}>
            Your password is safe with bcrypt hasing algorithm.
        </Text>

        {/* Checkbox */}
        {/* <FormControl>
          <Checkbox> Check me out </Checkbox>
        </FormControl> */}

        {/* Buttons */}
        <Button
          colorScheme="blue"
          type="submit"
          width="full"
          _hover={{ bg: "blue.600" }}
          onClick={ signupInfo }
        >
          Sign Up
        </Button>

        <Button
          colorScheme="gray"
          variant="outline"
          width="full"
          onClick={() => navigate("/login")}
          _hover={{ bg: "blue.600" }}
          _active={{ bg: "gray.200" }}
        >
          Already have an account? Login
        </Button>
      </VStack>
    </Container>
  );
};

export default Signup;
