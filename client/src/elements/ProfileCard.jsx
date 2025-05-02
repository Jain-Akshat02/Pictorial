import { VStack, Box, Text, Button, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";


const ProfileCard = ({ userInfo , onClose }) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");

  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  return (
    <Flex
      position="fixed"
      top="40%"
      left="50%"
      transform="translate(-50%, -50%)" 
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      justify="center"
      align="center"
      zIndex={500}
      p={4}
    >
      <Box
        bg={bgColor}
        color={textColor}
        p={[4,6]}
        borderRadius="md"
        boxShadow="lg"
        width={["90%", "400px"]}
        maxW= "400px"
        position="relative"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Profile
          </Text>
          <IoMdClose
          size="25px"
          onClick={()=>{
            if(onClose) onClose()
          }}
          aria-label="Close Profile"
          style={{ cursor: "pointer", color: "gray.500" }}
           />
        </Flex>
        <VStack spacing={4} align="start">
          <Text>
            <strong>Username:</strong> {userInfo?.username || "N/A"}
          </Text>
          <Text>
            <strong>Email:</strong> {userInfo?.email || "N/A"}
          </Text>
          <Button
            colorScheme="red"
            width="full"
            _hover={{ bg: "red.600", color: "black" }}
            _active={{ bg: "red.700", color: "transparent" }}
            onClick={() => {
              setShowConfirmation(true); // Show confirmation card
            }}
          >
            Logout
          </Button>
        </VStack>

        {showConfirmation && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.7)"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="md"
          >
            <Text fontSize="lg" fontWeight="bold" mb={4} color="white">
              Are you sure you want to logout?
            </Text>
            <VStack spacing={4}>
              <Button
                colorScheme="red"
                width="full"
                onClick={handleLogout}
                _hover={{ bg: "red.600", color: "black" }}
                _active={{ bg: "red.700", color: "transparent" }}
              >
                 Logout
              </Button>
              <Button
                colorScheme="gray"
                width="full"
                onClick={() => setShowConfirmation(false)} // Close confirmation card
                _hover={{ bg: "gray.300" }}
              >
                Cancel
              </Button>
            </VStack>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default ProfileCard;
