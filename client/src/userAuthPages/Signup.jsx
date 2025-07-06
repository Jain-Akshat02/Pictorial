import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toaster } from '../components/ui/toaster';
import { useColorModeValue } from "../components/ui/color-mode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  // Get color mode values
  const bgColor = useColorModeValue(
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
  );
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(26, 32, 44, 0.95)"
  );
  const textColor = useColorModeValue("#4a5568", "#a0aec0");
  const inputBg = useColorModeValue("#f8fafc", "#2d3748");
  const inputBorder = useColorModeValue("#e2e8f0", "#4a5568");
  const headingGradient = useColorModeValue(
    "linear-gradient(45deg, #4a5568, #2d3748)",
    "linear-gradient(45deg, #a0aec0, #718096)"
  );

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
      toaster.create({
        title: "Error",
        description: "Please enter all fields",
        status: "error",
        key: "uploading",
        isClosable: true,
      });
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
      const response = await axios.post(`/auth/register`, {
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
          })
        } 
        else if (errorMessage === "User already exists") {
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
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: bgColor,
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "450px",
        background: cardBg,
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <Toaster toastOptions={{
          duration: 5000,
          style: {
            background: "white",
            color: "black",
          },
          isClosable: true,
        }} />
        
        <h1 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "30px",
          color: textColor,
        }}>
          Create Account
        </h1>

        <form style={{ width: "100%" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: textColor,
              fontSize: "1rem",
              fontWeight: "600"
            }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={userInfo.username}
              onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${inputBorder}`,
                fontSize: "1rem",
                transition: "all 0.3s ease",
                background: inputBg,
                outline: "none",
                color: textColor
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: textColor,
              fontSize: "1rem",
              fontWeight: "600"
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${inputBorder}`,
                fontSize: "1rem",
                transition: "all 0.3s ease",
                background: inputBg,
                outline: "none",
                color: textColor
              }}
            />
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              color: textColor,
              fontSize: "1rem",
              fontWeight: "600"
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${inputBorder}`,
                fontSize: "1rem",
                transition: "all 0.3s ease",
                background: inputBg,
                outline: "none",
                color: textColor
              }} //check 1
            />
          </div>

          <button
            
            onClick={signupInfo}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              background: "linear-gradient(45deg, #4299e1, #3182ce)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(66, 153, 225, 0.3)"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(66, 153, 225, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(66, 153, 225, 0.3)";
            }}
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              background: "transparent",
              color: textColor,
              fontSize: "1rem",
              fontWeight: "600",
              border: `1px solid ${inputBorder}`,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.background = inputBg;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
