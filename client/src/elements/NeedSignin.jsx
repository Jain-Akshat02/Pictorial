import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useColorModeValue } from '../components/ui/color-mode'
const NeedSignin = () => {
    const buttonBg = useColorModeValue(
        "linear-gradient(45deg, #4299e1, #3182ce)",
        "linear-gradient(45deg, #3182ce, #2b6cb0)"
      );
    const bgColor = useColorModeValue(
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
      );
      const cardBg = useColorModeValue(
        "rgba(255, 255, 255, 0.95)",
        "rgba(26, 32, 44, 0.95)"
      );
      const textColor = useColorModeValue("#4a5568", "#a0aec0");
      const navigate = useNavigate();
  return (
    <div style={{
        width: "100%",
        maxWidth: "500px",
        background: cardBg,
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "20px",
          color: textColor
        }}>
          You need to be logged in to upload photos
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: textColor,
          marginBottom: "30px",
          lineHeight: "1.6"
        }}>
          Join our community to share your beautiful moments with others.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px"
        }}>
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              background: buttonBg,
              color: "white",
              fontSize: "1rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
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
            onClick={() => navigate(-1)}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              background: "transparent",
              color: textColor,
              fontSize: "1rem",
              fontWeight: "600",
              border: `1px solid ${textColor}`,
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.background = cardBg;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Go Back
          </button>
        </div>
    </div>
  )
}

export default NeedSignin
