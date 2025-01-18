import React, { useState, useEffect } from "react";
import axios from "axios";

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

  if (loading) return <p>Cargando imágenes...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Imágenes de la NASA</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {data.map((item, index) => (
          <div key={index} style={{ maxWidth: "300px", textAlign: "center" }}>
            <img
              src={item.url}
              alt={item.title}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
            <h3>{item.title}</h3>
            <p>{item.explanation.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NASAImages;
