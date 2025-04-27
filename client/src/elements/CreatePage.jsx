import { Container, Heading, VStack,Box, Input, Button} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Toaster, toaster } from '../components/ui/toaster';
const CreatePage = () => {
  const [newPhoto , setNewPhoto] = React.useState({
    title: "",
    description: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleAddPhoto = async() => {
    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      toaster.create({
        title: "Error",
        description: "Please select a file to upload.",
        status: "error",
        key: "uploading",
        isClosable: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append("title", newPhoto.title);
    formData.append("description", newPhoto.description);
    console.log(selectedFile.name, selectedFile.size, selectedFile.type);

    toaster.create({
      title: "Please wait",
      description: "Please wait while we upload your file.",
      status: "info",
      key: "uploading",
    });
    
    // sending data to the server
    try {
      const response = await axios.post("http://localhost:5000/photos/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("File uploaded successfully!");
      console.log("File uploaded successfully:\n", response.data);
      toaster.create({
        title: "Success",
        description: "File uploaded successfully!",
        status: "success",
        key: "uploading",
      });
      
    } catch (error) {
      console.error("Error uploading file:\n", error.response?.data || error.message);
      setUploadStatus("Failed to upload file. Please try again.");
      console.log(error.response?.data || error.message);
    }
  }
  return (
    <Container maxW={'container.sm'}>
      <Toaster toastOptions={{
        duration: 5000,
        style: {
          background: "white",
          color: "black",
        },
        isClosable: true,
      }} />
      <VStack spacing={8} >
        <Heading>
          Upload a new photo
        </Heading>

        <Box w={{ base: '90%', md: '80%', lg: '50%' }} bg={useColorModeValue("white","gray.800")}
        p={6} rounded={'lg'} shadow={"md"}>
          
            <VStack spacing={4} maxW={'90%'} >
                <Input
                name='title'
                placeholder='Give a name to your Picture'
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                />
                <Input
                name='description'
                placeholder='A brief description (optional)'
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                />
                <Input
                name='file'
                type='file'
                accept='image/*'
                // value={newPhoto.image} 
                onChange={handleImageChange}
                />
                <Button type='submit' bg='blue.400' onClick={handleAddPhoto} >Upload Photo</Button>
                
                
            </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage