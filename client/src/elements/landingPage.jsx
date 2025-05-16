import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useColorModeValue } from '../components/ui/color-mode'
const LandingPage = () => {
    const navigate = useNavigate();
  
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
  const buttonBg = useColorModeValue(
    "linear-gradient(45deg, #4299e1, #3182ce)",
    "linear-gradient(45deg, #3182ce, #2b6cb0)"
  );

  return (
    <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: bgColor,
        padding: "20px"
  
      }}>
  
        <div style={{
          width: "100%",
          maxWidth: "800px",
          background: cardBg,
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          marginBottom: "40px"
        }}>
          <h1 style={{
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "20px",
            color: textColor,
          }}>
            Welcome to PiCTORIAL
          </h1>
          <p style={{
            textAlign: "center",
            fontSize: "1.2rem",
            color: textColor,
            marginBottom: "40px",
            lineHeight: "1.6"
          }}>
            Share your moments, tell your stories, and connect with others through beautiful photography.
          </p>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap"
          }}>
            <button
              onClick={() => navigate("/create")}
              style={{
                padding: "14px 28px",
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
              Create Post
            </button>
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "14px 28px",
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
              Join Now
            </button>
          </div>
        </div>
  
        {/* Features Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
          padding: "20px"
        }}>
          {[
            {
              title: "Share Your Clicks",
              description: "Upload and share your favorite photos with the world."
            },
            {
              title: "Connect with Others",
              description: "Engage with a community of photography enthusiasts."
            },
            {
              title: "Tell Your Story",
              description: "Add captions to your photos."
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: cardBg,
                borderRadius: "20px",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
              }}
            >
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "15px",
                color: textColor,
                
              }}>
                {feature.title}
              </h2>
              <p style={{
                color: textColor,
                lineHeight: "1.6"
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
  )
}
export default LandingPage;