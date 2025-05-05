"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useColorModeValue, useColorMode } from "../components/ui/color-mode";
import { CiUser } from "react-icons/ci";

const Navbar = ({ isLoggedIn, setShowProfile }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Get color mode values
  const bgColor = useColorModeValue(
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
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

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1,
      background: bgColor,
      padding: "20px",
      boxShadow: colorMode === "dark" ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
      backdropFilter: colorMode === "dark" ? "blur(10px)" : "none",
      borderBottom: colorMode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      transition: "all 0.3s ease"
    }}>
      <div style={{
        maxWidth: "1270px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: colorMode === "dark" ? "#4299e1" : "#3182ce",
          fontFamily: "sans-serif",
          textShadow: colorMode === "dark" ? "0 0 10px rgba(66, 153, 225, 0.3)" : "none",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
        onMouseOver={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.textShadow = colorMode === "dark" ? "0 0 15px rgba(66, 153, 225, 0.5)" : "none";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.textShadow = colorMode === "dark" ? "0 0 10px rgba(66, 153, 225, 0.3)" : "none";
        }}
        onClick={() => navigate("/")}>
          PiCTORIAL
        </h1>

        {/* Desktop Menu */}
        <div style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          "@media (maxWidth: 768px)": {
            display: "none"
          }
        }}>
          <button
            onClick={() => navigate("/create")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent",
              color: colorMode === "dark" ? "#4299e1" : textColor,
              fontSize: "1rem",
              fontWeight: "500",
              border: colorMode === "dark" ? "1px solid rgba(66, 153, 225, 0.2)" : "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseOver={(e) => {
              e.target.style.background = colorMode === "dark" ? "rgba(66, 153, 225, 0.2)" : hoverBg;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <CiSquarePlus size={20} />
            Create
          </button>

          <button
            onClick={toggleColorMode}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent",
              color: colorMode === "dark" ? "#4299e1" : textColor,
              fontSize: "1rem",
              fontWeight: "500",
              border: colorMode === "dark" ? "1px solid rgba(66, 153, 225, 0.2)" : "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseOver={(e) => {
              e.target.style.background = colorMode === "dark" ? "rgba(66, 153, 225, 0.2)" : hoverBg;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent";
              e.target.style.transform = "translateY(0)";
            }}
          >
            {colorMode === "dark" ? <IoSunnyOutline size={20} /> : <IoSunny size={20} />}
            {colorMode === "dark" ? "Light" : "Dark"}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => setShowProfile(true)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent",
                color: colorMode === "dark" ? "#4299e1" : textColor,
                fontSize: "1rem",
                fontWeight: "500",
                border: colorMode === "dark" ? "1px solid rgba(66, 153, 225, 0.2)" : "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onMouseOver={(e) => {
                e.target.style.background = colorMode === "dark" ? "rgba(66, 153, 225, 0.2)" : hoverBg;
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent";
                e.target.style.transform = "translateY(0)";
              }}
            >
              <CiUser size={20} />
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                background: buttonBg,
                color: "white",
                fontSize: "1rem",
                fontWeight: "500",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 15px rgba(66, 153, 225, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleDrawer}
          style={{
            display: "none",
            "@media (maxWidth: 768px)": {
              display: "block"
            },
            padding: "8px",
            borderRadius: "8px",
            background: "transparent",
            color: textColor,
            fontSize: "1.5rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => {
            e.target.style.background = hoverBg;
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <div style={{
            width: "280px",
            height: "100%",
            background: colorMode === "dark" ? "rgba(26, 32, 44, 0.95)" : "rgba(255, 255, 255, 0.95)",
            padding: "20px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            transform: isDrawerOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
              borderBottom: `1px solid ${colorMode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`
            }}>
              <h2 style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: textColor
              }}>
                Menu
              </h2>
              <button
                onClick={toggleDrawer}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: textColor,
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.target.style.background = hoverBg;
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "none";
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}>
              <button
                onClick={() => {
                  navigate("/create");
                  setIsDrawerOpen(false);
                }}
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
                <CiSquarePlus size={20} />
                Create Post
              </button>

              <button
                onClick={() => {
                  toggleColorMode();
                  setIsDrawerOpen(false);
                }}
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
                {colorMode === "dark" ? <IoSunnyOutline size={20} /> : <IoSunny size={20} />}
                {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setIsDrawerOpen(false);
                  }}
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
                  <CiUser size={20} />
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsDrawerOpen(false);
                  }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: buttonBg,
                    color: "white",
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
                    e.target.style.transform = "translateX(5px)";
                    e.target.style.boxShadow = "0 4px 15px rgba(66, 153, 225, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateX(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
