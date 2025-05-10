import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useColorModeValue } from "../components/ui/color-mode.jsx";

const ProfileCard = ({ userInfo, onClose }) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
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
  const hoverBg = useColorModeValue(
    "rgba(0, 0, 0, 0.05)",
    "rgba(255, 255, 255, 0.1)"
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 500,
      padding: "20px",
      backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: cardBg,
        color: textColor,
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        width: "90%",
        maxWidth: "400px",
        position: "relative",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}>
          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: textColor
          }}>
            Profile
          </h2>
          <IoMdClose
            size="24px"
            onClick={onClose}
            style={{
              cursor: "pointer",
              color: textColor,
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#e53e3e";
            }}
            onMouseOut={(e) => {
              e.target.style.color = textColor;
            }}
          />
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: buttonBg,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              {userInfo?.username?.[0]?.toUpperCase() || "?"}
            </div>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: textColor,
              marginBottom: "5px"
            }}>
              {userInfo?.username || "N/A"}
            </h3>
            <p style={{
              fontSize: "0.9rem",
              color: textColor,
              opacity: "0.8"
            }}>
              {userInfo?.email || "N/A"}
            </p>
          </div>

          <div style={{
            height: "1px",
            background: "rgba(0, 0, 0, 0.1)",
            margin: "10px 0"
          }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <button
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                background: "transparent",
                color: textColor,
                fontSize: "1rem",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.background = hoverBg;
                e.target.style.transform = "translateX(5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateX(0)";
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>👤</span>
              Change Username
            </button>

            <button
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                background: "transparent",
                color: textColor,
                fontSize: "1rem",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.background = hoverBg;
                e.target.style.transform = "translateX(5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateX(0)";
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>✉️</span>
              Reach out to Akshat Jain
            </button>

            <div style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.1)",
              margin: "10px 0"
            }} />

            <button
              onClick={() => setShowConfirmation(true)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                background: "transparent",
                color: "#e53e3e",
                fontSize: "1rem",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(229, 62, 62, 0.1)";
                e.target.style.transform = "translateX(5px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateX(0)";
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>🚪</span>
              Logout
            </button>
          </div>
        </div>

        {showConfirmation && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
            padding: "30px"
          }}>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "20px",
              color: "white",
              textAlign: "center"
            }}>
              Are you sure you want to logout?
            </h3>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%"
            }}>
              <button
                onClick={handleLogout}
                style={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  background: "#e53e3e",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#c53030";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "#e53e3e";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                style={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  background: "transparent",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "1px solid white",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
