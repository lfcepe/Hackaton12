import React, { useState, useEffect } from "react";
import axios from "axios";
import './NASAimages.css';

const NASAImages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=5`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images from NASA API:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p className="loading-text">Cargando imágenes...</p>;

  return (
    <div className="nasa-container">
      <h2 className="nasa-title">Imágenes de la NASA</h2>
      <div className="nasa-grid">
        {data.map((item, index) => (
          <div key={index} className="nasa-card">
            <img src={item.url} alt={item.title} />
            <div className="nasa-card-content">
              <h3 className="nasa-card-title">{item.title}</h3>
              <p className="nasa-card-text">
                {item.explanation.substring(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NASAImages;
