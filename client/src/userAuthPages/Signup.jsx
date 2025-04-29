import {
  Container,
  Heading,
  VStack,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useColorModeValue } from "../components/ui/color-mode";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  // Define colors for light and dark modes
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const inputBg = useColorModeValue("gray.50", "gray.700");

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
      <Heading mb={6} textAlign="center" color="blue.500">
        Signup{" "}
      </Heading>
      <VStack spacing={4} as="form">
        {/* Email Field */}
        <FormControl id="email" isRequired>
          <FormLabel fontSize="lg" color="gray.700">
            Email address
          </FormLabel>
          <Input
            type="email"
            placeholder="Enter email"
            size="lg"
            bg={inputBg}
            focusBorderColor="blue.400"
            width="100%"
          />
          <Text fontSize="sm" color="gray.500" mt={1}>
            We'll never share your email with anyone else.
          </Text>
        </FormControl>

        {/* Password Field */}
        <FormControl id="password" isRequired>
          <FormLabel fontSize="lg" color={textColor}>
            {" "}
            Password{" "}
          </FormLabel>
          <Input
            type="password"
            placeholder="Enter password"
            size="lg"
            focusBorderColor="blue.400"
            bg={inputBg}
            width="100%"
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
