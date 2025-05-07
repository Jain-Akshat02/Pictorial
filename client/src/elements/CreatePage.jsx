import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useColorModeValue } from '../components/ui/color-mode';
import { toaster, Toaster } from '../components/ui/toaster.jsx';

const CreatePage = () => {
  const [newPhoto, setNewPhoto] = React.useState({
    title: "",
    description: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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
  const inputBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(26, 32, 44, 0.8)"
  );
  const inputBorder = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  );
  const buttonBg = useColorModeValue(
    "linear-gradient(45deg, #4299e1, #3182ce)",
    "linear-gradient(45deg, #3182ce, #2b6cb0)"
  );

  const jwtToken = localStorage.getItem("jwtToken");
  
  if(!jwtToken){
    return(
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
      </div>
    );
  }
  
  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAddPhoto = async() => {
    if (!selectedFile) {
      toaster.create({
        title:"No file selected",
        description:"Please select a file to upload.",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-right",
      });
      
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append("title", newPhoto.title);
    formData.append("description", newPhoto.description);           

    try {
      const response = await axios.post("http://localhost:5000/photos/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      toaster.create({
        title: "Success",
        description: "Your photo has been uploaded successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      
      // Reset form
      setNewPhoto({ title: "", description: "", image: "" });
      setSelectedFile(null);
      
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.response?.data?.message || "Failed to upload photo. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setIsUploading(false);
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
      <Toaster />
      <div style={{
        width: "100%",
        maxWidth: "600px",
        background: cardBg,
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        <h1 style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "700",
          marginBottom: "30px",
          color: textColor
        }}>
          Share Your Moment
        </h1>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <div>
            <input
              name="title"
              placeholder="Give your photo a title..."
              value={newPhoto.title}
              onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${inputBorder}`,
                background: inputBg,
                fontSize: "1rem",
                color: textColor,
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4299e1";
                e.target.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = inputBorder;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <input
              name="description"
              placeholder="Tell us about your photo..."
              value={newPhoto.description}
              onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: `1px solid ${inputBorder}`,
                background: inputBg,
                fontSize: "1rem",
                color: textColor,
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#4299e1";
                e.target.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = inputBorder;
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div
            style={{
              border: `2px dashed ${inputBorder}`,
              borderRadius: "10px",
              padding: "30px",
              textAlign: "center",
              cursor: "pointer",
              background: inputBg,
              transition: "all 0.3s ease"
            }}
            onClick={() => document.getElementById("file-upload").click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "#4299e1";
              e.currentTarget.style.background = "rgba(66, 153, 225, 0.1)";
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.background = inputBg;
            }}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) {
                setSelectedFile(file);
              }
              e.currentTarget.style.borderColor = inputBorder;
              e.currentTarget.style.background = inputBg;
            }}
          >
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <p style={{
              color: textColor,
              fontSize: "1.1rem",
              marginBottom: "10px",
              fontWeight: "500"
            }}>
              Drag & drop your photo here
            </p>
            <p style={{
              fontSize: "0.9rem",
              color: textColor,
              opacity: "0.8"
            }}>
              or click to browse
            </p>
            {selectedFile && (
              <p style={{
                fontSize: "0.9rem",
                color: textColor,
                marginTop: "10px",
                fontWeight: "500"
              }}>
                {selectedFile.name}
              </p>
            )}
          </div>

          <button
            onClick={handleAddPhoto}
            disabled={isUploading}
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
              boxShadow: "0 4px 15px rgba(66, 153, 225, 0.3)",
              opacity: isUploading ? "0.7" : "1",
              maxWidth: "80%",
              margin: "0 auto"
            }}
            onMouseOver={(e) => {
              if (!isUploading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(66, 153, 225, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!isUploading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(66, 153, 225, 0.3)";
              }
            }}
          >
            {isUploading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;