import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toaster } from "../components/ui/toaster";
import React from "react";

const Login = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const inputBg = useColorModeValue("gray.50", "gray.700");

  const verifyUser = async (e) => {
    e.preventDefault();

    if(loginInfo.email === '' || loginInfo.password === ''){
      toaster.create({
        title: "Error",
        description: "Please enter all fields",
        status: "error",
      });
    }
    if (!loginInfo.email.includes("@") && !loginInfo.email.includes(".com")) {
      toaster.create({
          title: "Error",
          description: "Please enter a valid email address",
          status: "error",
      });
      return;
  }
    toaster.create({
      title: "Please wait",
        description: "Verifying your credentials...",
        status: "info",
        isClosable: true
    });

    try {
      console.log("Sending login request with:", loginInfo);
      const response = await axios.post("http://localhost:5000/auth/login", 
        {
          email: loginInfo.email,
          password: loginInfo.password
        }
      );
      console.log("Login response:", response.data);
      
      // Check if we have a successful response
      if (response.data.success && response.data.jwtToken) {
        console.log("Login successful, storing token" );
        
        
        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("userInfo", JSON.stringify({
          email: response.data.email,
        }));

        toaster.create({
          title: "Success",
          description: "Login successful! Redirecting...",
          status: "success",
          duration: 2000,
        });

        setTimeout(() => {
          console.log("Redirecting to home page");
          navigate("/");
        }, 2000);
      } else {
        console.log("Unexpected response format:", response.data);
        toaster.create({
          title: "Error",
          description: "Unexpected response from server",
          status: "error",
        });
      }
    } catch (error) {
      console.log("Login error:", error.response?.data);
      if(error.response){
        toaster.create({
          title: "Error",
          description: error.response.data.message || "Invalid credentials",
          status: "error",
        });
      }
      else{
        toaster.create({
          title: "Error",
          description: error.message || "An unexpected error occurred",
          status: "error",
        });
      }
    }
  };



  const [loginInfo, setloginInfo] = React.useState({
    email: "",
    password: "",
  });

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
      <Toaster
        toastOptions={{
          duration: 5000,
          style: {
            background: "white",
            color: "black",
          },
          isClosable: true,
        }}
      />
      <Heading mb={6} textAlign="center" color="blue.500">
        Login{" "}
      </Heading>
      <VStack spacing={4} as="form" width="100%">
        <FormControl id="email" isRequired>
          <FormLabel fontSize="lg" color="gray.700" fontWeight="bold">
            Email address
          </FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            size="lg"
            bg={inputBg}
            onChange={(e) =>
              setloginInfo({ ...loginInfo, email: e.target.value })
            }
            value={loginInfo.email}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel fontSize="lg" color="gray.700" fontWeight="bold">
            Passowrd
          </FormLabel>
          <Input
            type="password"
            placeholder="Enter password"
            size="lg"
            bg={inputBg}
            onChange={(e) =>
              setloginInfo({ ...loginInfo, password: e.target.value })
            }
            value={loginInfo.password}
          />
        </FormControl>
            <br></br>
        <Button
          colorScheme="blue"
          type="submit"
          width="full"
          _hover={{ bg: "blue.600" }}
          onClick={verifyUser}
        >
          Login
        </Button>

        <Button
        colorScheme="gray"
        variant="outline"
        width="full"
        onClick={() => navigate("/signup")}
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "gray.200" }}
        >
          Don't have an account? Sign Up
        </Button>
      </VStack>
    </Container>
  );
};

export default Login ;
