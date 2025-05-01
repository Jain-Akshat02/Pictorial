import { 
  Container, 
  VStack, 
  Box, 
  Text, 
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';


const ProfileCard = () => {
  const navigate = useNavigate();


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
          <Text fontSize="lg" fontWeight="bold" color="white">
            Username
          </Text>
          <Text color="white">Hello Sir</Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="white">
            Email
          </Text>
          <Text color="white">hello@gmail.com</Text>
        </Box>
        <Button
          colorScheme="red"
          // onClick={handleLogout}
          _hover={{ bg: "red.600" }}
          onClick={() => navigate("/logout")}
        >
          Logout
        </Button>
      </VStack>
    </Container>
  )
}

export default ProfileCard