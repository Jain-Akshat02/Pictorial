import { VStack, Box, Text, Button, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";


const ProfileCard = ({ userInfo , onClose }) => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");

  const navigate = useNavigate();

  return (
    <Flex
      position="fixed"
      top={-20}
      left={400}
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      justify="center"
      align="center"
      zIndex={500}
    >
      <Box
        bg={bgColor}
        color={textColor}
        p={6}
        borderRadius="md"
        boxShadow="lg"
        width={["90%", "400px"]}
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
              navigate("/");
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ProfileCard;
