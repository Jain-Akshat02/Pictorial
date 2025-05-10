import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useColorModeValue } from '../components/ui/color-mode';

const UserImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const borderColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  );

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
        // console.log("Response from server:", response.data); // Debug log
        setImages(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error details:", error.response || error); // More detailed error logging
        setError(error.response?.data?.message || "Failed to load images. Please try again later.");
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // console.log("Current state:", { images, loading, error }); // Debug log

  if (loading) {
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
          color: textColor,
          fontSize: "1.2rem",
          fontWeight: "500"
        }}>
          Loading your images...
        </div>
      </div>
    );
  }

  if (error) {
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
          color: "#e53e3e",
          fontSize: "1.2rem",
          fontWeight: "500"
        }}>
          {error}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) {
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
          color: textColor,
          fontSize: "1.2rem",
          fontWeight: "500",
          textAlign: "center"
        }}>
          <p>No images found.</p>
          <p style={{ fontSize: "1rem", opacity: 0.8, marginTop: "10px" }}>
            Start sharing your moments by uploading your first photo!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: bgColor,
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "40px",
          color: textColor,
          textAlign: "center"
        }}>
          Your Uploaded Images
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "30px",
          padding: "20px"
        }}>
          {images.map((image) => (
            <div
              key={image._id}
              style={{
                background: cardBg,
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                border: `1px solid ${borderColor}`,
                cursor: "pointer"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-5px)";
                e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{
                position: "relative",
                paddingTop: "75%",
                overflow: "hidden"
              }}>
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
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>
              <div style={{
                padding: "20px"
              }}>
                <h3 style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: textColor
                }}>
                  {image.name}
                </h3>
                <p style={{
                  fontSize: "1rem",
                  color: textColor,
                  opacity: 0.8,
                  lineHeight: "1.5"
                }}>
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserImage;
