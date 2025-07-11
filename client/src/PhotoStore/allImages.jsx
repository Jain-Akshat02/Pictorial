import React, { useState, useEffect } from "react";
import axios from "axios";
import { useColorModeValue } from "../components/ui/color-mode";
import { LuDownload } from "react-icons/lu";
import { LuImage, LuClock } from "react-icons/lu";
import dotenv from "dotenv";
dotenv.config();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const AllImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  const mobileBreakpoint = 768;

  // Get color mode values
  const bgColor = useColorModeValue(
    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
  );
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.98)",
    "rgba(30, 41, 59, 0.98)"
  );
  const textColor = useColorModeValue("#334155", "#cbd5e1");
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.08)",
    "rgba(255, 255, 255, 0.08)"
  );
  const accentColor = useColorModeValue("#3b82f6", "#60a5fa");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [mobileBreakpoint]); //it will run if the mobileBreakpoint changes(not in this case)

  useEffect(() => {
    // const jwtToken = localStorage.getItem("jwtToken");
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/photos`);
        setImages(response.data.data); // Access the data property from response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load images. Please try again later."
        );
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleDownload = async (imageUrl, imageName) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${imageName || "image"}.jpg`;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bgColor,
          padding: "20px",
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: "1.2rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            className="loading-spinner"
            style={{
              width: "24px",
              height: "24px",
              border: `3px solid ${borderColor}`,
              borderTop: `3px solid ${accentColor}`,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          Loading images...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bgColor,
          padding: "20px",
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: "1.2rem",
            fontWeight: "500",
            padding: "20px",
            borderRadius: "12px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: bgColor,
          padding: "20px",
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: "1.2rem",
            fontWeight: "500",
          }}
        >
          No images found
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgColor,
        padding: "60px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            marginBottom: "60px",
            color: textColor,
            textAlign: "center",
            letterSpacing: "-0.02em",
            textShadow: `0 0 10px #dde2e8, 0 0 20px ${accentColor}`,
          }}
        >
          The world is now PiCTORIZING
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(auto-fill, minmax(350px, 1fr))",
            gap: isMobile ? "15px" : "40px",
            padding: isMobile ? "0 10px" : "20px",
          }}
        >
          {images.map((image) => (
            <div
              key={image._id}
              style={{
                background: cardBg,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                border: `1px solid ${borderColor}`,
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={() => setHoveredImage(image._id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div
                style={{
                  position: "relative",
                  paddingTop: "75%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={image.cloudinaryUrl}
                  alt={image.name}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform:
                      hoveredImage === image._id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                    opacity: hoveredImage === image._id ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      transform: `translateY(${
                        hoveredImage === image._id ? "0" : "20px"
                      })`,
                      transition: "transform 0.3s ease",
                      opacity: hoveredImage === image._id ? 1 : 0,
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        opacity: 0.9,
                      }}
                    >
                      <LuClock style={{ marginRight: "5px" }} />
                      {new Date(image.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "25px",
                position: "relative",
                background: cardBg,
                transition: "all 0.3s ease"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.4rem",
                  fontWeight: "700",
                  color: textColor,
                  marginBottom: "10px",
                  letterSpacing: "-0.01em",
                  transition: "all 0.3s ease",
                  transform: hoveredImage === image._id ? "translateY(-5px)" : "translateY(0)"
                    }}
                  >
                    {image.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.95rem",
                      color: accentColor,
                      fontWeight: "500",
                    }}
                  >
                    By {image.user?.username || "Anonymous"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() =>
                      handleDownload(image.cloudinaryUrl, image.name)
                    }
                    style={{
                      border: "none",
                      cursor: "pointer",
                      color: textColor,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.9rem",
                      fontWeight: "400",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                      background: "transparent",
                      opacity: 0.7,
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = "1";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = "0.7";
                    }}
                  >
                    <LuDownload size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllImages;
