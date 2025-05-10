import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useColorModeValue } from '../components/ui/color-mode';
import { LuDownload } from 'react-icons/lu';

const AllImages = () =>{
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(false);


    const mobileBreakpoint = 768;

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

    useEffect(() =>{
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        // Check size on initial render
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', checkScreenSize);

    }, [mobileBreakpoint]); //it will run if the mobileBreakpoint changes(not in this case)

    useEffect(() =>{
        // const jwtToken = localStorage.getItem("jwtToken");
        const fetchImages = async () => {
            try {
                const response = await axios.get("http://localhost:5000/photos");
                setImages(response.data.data); // Access the data property from response
                setLoading(false);
            } catch (error) {
                console.error("Error fetching images:", error);
                setError(error.response?.data?.message || "Failed to load images. Please try again later.");
                setLoading(false);
            }
        };
        fetchImages();
    },[]);

    const handleDownload = async (imageUrl, imageName) => {
        try {
            // Fetch the image as a blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            // Create a blob URL
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Create a temporary link element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${imageName || 'image'}.jpg`;
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

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
                    Loading images...
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
        return <div className="no-images">No images found</div>;
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
                    The world is now PiCTORIZING
                </h2>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: isMobile ? "10px" : "30px",
                    padding: isMobile ? "0 10px" : "20px"
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
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "10px"
                                }}>
                                    <h3 style={{
                                        fontSize: "1.25rem",
                                        fontWeight: "600",
                                        color: textColor
                                    }}>
                                        {image.name}
                                    </h3>
                                    <span style={{
                                        fontSize: "0.9rem",
                                        color: textColor,
                                        opacity: 0.8,
                                        fontStyle: "italic"
                                    }}>
                                        By {image.user?.username || "Anonymous"}
                                    </span>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginBottom: "10px"
                                }}>
                                    <button
                                        onClick={() => handleDownload(image.cloudinaryUrl, image.name)}
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                            color: textColor,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            fontSize: "0.9rem",
                                            opacity: 0.8,
                                            transition: "opacity 0.2s ease"
                                        }}
                                        onMouseOver={(e) => e.target.style.opacity = "1"}
                                        onMouseOut={(e) => e.target.style.opacity = "0.8"}
                                    >
                                        <LuDownload size={16} />
                                        
                                    </button>
                                </div>
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
    )
}

export default AllImages;