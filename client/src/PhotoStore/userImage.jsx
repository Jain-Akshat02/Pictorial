import react from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const UserImage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/photos/my-photos",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

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

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  if (images.length === 0) {
    return <p>No images found.</p>;
  }
  return (
    <div className="uploaded-images-container">
      <h2>Your Uploaded Images</h2>
      <div className="image-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {images.map((image) => {
          return (
            <div key={image._id} className="image-card" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <img
                src={image.cloudinaryUrl}
                alt={image.name}
                style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
              />
              <h3>{image.name}</h3>
              <p>{image.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserImage;
