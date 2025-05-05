"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useColorModeValue, useColorMode } from "../components/ui/color-mode";
import { CiUser } from "react-icons/ci";
import styles from "./Navbar.module.css";

const Navbar = ({ isLoggedIn, setShowProfile }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Get color mode values
  const bgColor = useColorModeValue(
    "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
  );

  // Set CSS variables based on color mode
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      "--box-shadow",
      colorMode === "dark" ? "0 4px 30px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)"
    );
    document.documentElement.style.setProperty(
      "--backdrop-filter",
      colorMode === "dark" ? "blur(10px)" : "none"
    );
    document.documentElement.style.setProperty(
      "--border-bottom",
      colorMode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
    );
    document.documentElement.style.setProperty(
      "--logo-color",
      colorMode === "dark" ? "#4299e1" : "#3182ce"
    );
    document.documentElement.style.setProperty(
      "--logo-shadow",
      colorMode === "dark" ? "0 0 10px rgba(66, 153, 225, 0.3)" : "none"
    );
    document.documentElement.style.setProperty(
      "--logo-hover-shadow",
      colorMode === "dark" ? "0 0 15px rgba(66, 153, 225, 0.5)" : "none"
    );
    document.documentElement.style.setProperty(
      "--button-bg",
      colorMode === "dark" ? "rgba(66, 153, 225, 0.1)" : "transparent"
    );
    document.documentElement.style.setProperty(
      "--button-color",
      colorMode === "dark" ? "#4299e1" : "#4a5568"
    );
    document.documentElement.style.setProperty(
      "--button-border",
      colorMode === "dark" ? "1px solid rgba(225, 130, 66, 0.2)" : "none"
    );
    document.documentElement.style.setProperty(
      "--button-hover-bg",
      colorMode === "dark" ? "rgba(66, 153, 225, 0.2)" : "rgba(0, 0, 0, 0.05)"
    );
    document.documentElement.style.setProperty(
      "--signup-bg",
      colorMode === "dark" ? "linear-gradient(45deg, #3182ce, #2b6cb0)" : "linear-gradient(45deg, #4299e1, #3182ce)"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      colorMode === "dark" ? "#a0aec0" : "#4a5568"
    );
    document.documentElement.style.setProperty(
      "--hover-bg",
      colorMode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
    );
    document.documentElement.style.setProperty(
      "--drawer-bg",
      colorMode === "dark" ? "rgba(26, 32, 44, 0.95)" : "rgba(255, 255, 255, 0.95)"
    );
    document.documentElement.style.setProperty(
      "--drawer-border",
      colorMode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
    );
    document.documentElement.style.setProperty(
      "--drawer-header-border",
      colorMode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
    );
  }, [colorMode]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className={styles.navbar} style={{ background: bgColor }}>
      <div className={styles.navContainer}>
        <h1 
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          PiCTORIAL
        </h1>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <button
            onClick={() => navigate("/create")}
            className={styles.navButton}
          >
            <CiSquarePlus size={20} />
            Create
          </button>

          <button
            onClick={toggleColorMode}
            className={styles.navButton}
          >
            {colorMode === "dark" ? <IoSunnyOutline size={20} /> : <IoSunny size={20} />}
            {colorMode === "dark" ? "Light" : "Dark"}
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => setShowProfile(true)}
              className={styles.navButton}
            >
              <CiUser size={20} />
              Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className={styles.signUpButton}
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleDrawer}
          className={styles.mobileMenuButton}
        >
          <RxHamburgerMenu />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div 
            className={styles.drawerOverlay}
            onClick={toggleDrawer}
            ><div className={styles.drawer}>
            <div className={styles.drawerHeader}>
              <h2>Menu</h2>
              <button
                onClick={toggleDrawer}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <div className={styles.drawerContent}>
              <button
                onClick={() => {
                  navigate("/create");
                  setIsDrawerOpen(false);
                }}
                className={styles.drawerButton}
              >
                <CiSquarePlus size={20} />
                <b>Create Post</b>
              </button>

              <button
                onClick={() => {
                  toggleColorMode();
                  setIsDrawerOpen(false);
                }}
                className={styles.drawerButton}
              >
                {colorMode === "dark" ? <IoSunnyOutline size={20} /> : <IoSunny size={20} />}
                <b>
                {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
                </b>
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setIsDrawerOpen(false);
                  }}
                  className={styles.drawerButton}
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
                  className={styles.drawerSignUpButton}
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
