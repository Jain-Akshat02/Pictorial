import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toaster } from "../components/ui/toaster";
import { useColorModeValue } from "../components/ui/color-mode";

const Login = ({setIsLoggedIn, setUserInfo}) => {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = React.useState({
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

  const verifyUser = async (e) => {
    e.preventDefault();

    if(loginInfo.email === '' || loginInfo.password === ''){
      toaster.create({
        title: "Error",
        description: "Please enter all fields",
        status: "error",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInfo.email)) {
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

    try{
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
          email: response.data.user.email,
          username: response.data.user.username,
        }));

        //Update the state in App.jsx
        setIsLoggedIn(true);
        setUserInfo({
          email: response.data.user.email,
          username: response.data.user.username,
        });

        toaster.create({
          title: "Success",
          description: "Login successful! Happy Pictorizing!",
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
        
        <h1 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "30px",
          background: headingGradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Welcome Back
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
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              onChange={(e) => setloginInfo({ ...loginInfo, email: e.target.value })}
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
              value={loginInfo.password}
              onChange={(e) => setloginInfo({ ...loginInfo, password: e.target.value })}
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

          <button
            onClick={verifyUser}
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
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
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
            Don't have an account? Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
