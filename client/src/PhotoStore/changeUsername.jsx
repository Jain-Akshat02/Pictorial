import React, { useState } from "react";
import { useColorModeValue, useColorMode } from "../components/ui/color-mode";
import { toaster, Toaster } from "../components/ui/toaster";

const ChangeUsername = ({ onUsernameChanged }) => {
  const bgColor = useColorModeValue(
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
  );
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(26, 32, 44, 0.95)"
  );
  const textColor = useColorModeValue("#4a5568", "#a0aec0");
  const inputBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(26, 32, 44, 0.8)"
  );
  const inputBorder = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  );
  const buttonBg = useColorModeValue(
    "linear-gradient(45deg, #4299e1, #3182ce)",
    "linear-gradient(45deg, #3182ce, #2b6cb0)"
  );

  const [newUsername, setUsername] = useState("");
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        padding: "20px",

        marginTop: "-130px",
      }}
    >
      <Toaster />
      <form
        style={{
          width: "300px",
          backgroundColor: bgColor,
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          const jwtToken = localStorage.getItem("jwtToken");
          
          if (!jwtToken) {
            alert("You need to be logged in to change your username");
            return;
          }
          try {
            const response = await fetch(
              "http://localhost:5000/user/update-username",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ newUsername }),
              }
            );

            const data = await response.json();
            if (data.success) {
              console.log("ChangeUsername: Server success. New username from server:", data.username);
              // Get current userInfo
              const currentUserInfo = JSON.parse(localStorage.getItem("userInfo"));
              console.log("ChangeUsername: Current userInfo from localStorage:", currentUserInfo);
              
              // Create updated userInfo with new username
              const updatedUserInfo = {
                ...currentUserInfo,
                username: data.username
              };
              console.log("ChangeUsername: Updated userInfo to be saved:", updatedUserInfo);
              
              // Save to localStorage
              localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
              console.log("ChangeUsername: userInfo in localStorage updated:", localStorage.getItem("userInfo"));
              
              if (onUsernameChanged) {
                console.log("ChangeUsername: Calling onUsernameChanged callback.");
                onUsernameChanged();
              }
              toaster.create({
                title: "Username changed successfully",
                description: "Your username has been changed.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
              });
            } else {
              toaster.create({
                title: "Username not changed",
                description: "Error, try again later",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right",
              });
            }
          } catch (error) {
            return alert(error.message);
          }
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: textColor,
            marginBottom: "20px",
          }}
        >
          Change Username
        </h2>
        <label
          style={{
            fontSize: "16px",
            color: textColor,
            marginBottom: "10px",
          }}
        >
          New username:
          <input
            type="text"
            style={{
              width: "100%",
              height: "40px",
              fontSize: "16px",
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: inputBg,
              border: `1px solid ${cardBg}`,       
              borderRadius: "5px",
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
            padding: "10px",
            backgroundColor: buttonBg,
            color: textColor,
            borderRadius: "5px",
            cursor: "pointer",
            border: `1px solid ${cardBg}`,
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;
