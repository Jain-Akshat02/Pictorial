import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";

const ProfileButton = () => {
  const [showProfile, setShowProfile] = useState(false);
  const bgColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("white", "gray.800");
  return (
    <>
      <Button
        color={textColor}
        bg={bgColor}
        variant="outline"
        onClick={() => setShowProfile(true)}
        _hover={{ bg: "blue.600" }}
        _active={{ bg: "gray.200" }}
      >
        Profile
      </Button>
    </>
  );
};

export default ProfileButton;
