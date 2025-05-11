import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
import { LuImage, LuClock } from "react-icons/lu";

const UserImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
  const secondaryColor = useColorModeValue("#64748b", "#94a3b8");

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;
    try {
      const response = await axios.delete(
        `http://localhost:5000/photos/${_id}`
      );

      if (response.status === 200 ) {
        setImages(images.filter((image) => Photo._id !== _id));
        console.log(`Image with ID ${_id} deleted successfully`);
      } else {
        // Handle unexpected response status
        console.error(
          "Deletion failed with status:",
          response.status,
          response.data
        );
        setError("Failed to delete image. Please try again."); 
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setError("Failed to delete image. Please try again later.");
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [mobileBreakpoint]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:5000/photos/my-photos",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setImages(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error details:", error.response || error);
        setError(
          error.response?.data?.message ||
            "Failed to load images. Please try again later."
        );
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

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
            gap: "12px",
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
          Loading your gallery...
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
            textAlign: "center",
            maxWidth: "500px",
            padding: "40px",
            borderRadius: "20px",
            background: cardBg,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${borderColor}`,
          }}
        >
          <LuImage size={48} style={{ marginBottom: "20px", opacity: 0.5 }} />
          <p style={{ fontSize: "1.5rem", marginBottom: "15px" }}>
            Your Gallery is Empty
          </p>
          <p style={{ fontSize: "1rem", opacity: 0.8, lineHeight: "1.6" }}>
            Start your visual journey by uploading your first photo. Share your
            moments with the world!
          </p>
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
        <div
          style={{
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: textColor,
              letterSpacing: "-0.02em",
              marginBottom: "15px",
              background: `linear-gradient(135deg, ${textColor} 0%, ${accentColor} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your Visual Story
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: secondaryColor,
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            A collection of your captured moments, each telling its own unique
            story
          </p>
        </div>

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
                // cursor: "pointer",
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
                  transition: "all 0.3s ease",
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
                    transform:
                      hoveredImage === image._id
                        ? "translateY(-5px)"
                        : "translateY(0)",
                  }}
                >
                  {image.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from triggering parent handlers
                    handleDelete(image._id); // Call the delete function
                  }}
                  style={{
                    position: "absolute", // Position the button
                    top: "25px",
                    right: "10px",
                    zIndex: 1, // Ensure button is layered above image
                    background: "rgba(255, 0, 0, 0.7)", // Semi-transparent red background
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    opacity: 0.9,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.opacity = 1;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = 0.9;
                  }}
                  // Optional: Add aria-label for accessibility
                  aria-label={`Delete image ${image.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserImage;
