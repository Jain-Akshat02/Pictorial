import {
  Box,
  Button,
  VStack,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "./ui/toaster";

const ProfileCard = ({ userInfo, onClose }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toaster.create({
      title: "Success",
      description: "Logged out successfully",
      status: "success",
      duration: 2000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Container
      position="absolute"
      right="20px"
      top="60px"
      zIndex="1000"
      maxW="sm"
      py={4}
      px={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={bgColor}
    >
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Username
          </Text>
          <Text color={textColor}>{userInfo.username}</Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Email
          </Text>
          <Text color={textColor}>{userInfo.email}</Text>
        </Box>
        <Button
          colorScheme="red"
          onClick={handleLogout}
          _hover={{ bg: "red.600" }}
        >
          Logout
        </Button>
      </VStack>
    </Container>
  );
};

export default ProfileCard; 