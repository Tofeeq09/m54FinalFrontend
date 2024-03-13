// Temp.jsx

import { useEffect, useState } from "react";

const games = ["Minecraft", "Fortnite", "Among Us"];

const Temp = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    games.forEach((game) => {
      fetch(`https://api.rawg.io/api/games?key=3634dbd9a5ad4b329919fb133b9493ba&search=${game}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setImages((prevImages) => [...prevImages, data.results[0]?.background_image]);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(timer); // cleanup on unmount
  }, [images]);

  return <div>{images.length > 0 && <img src={images[currentImage]} alt={`Game ${currentImage + 1}`} />}</div>;
};

export default Temp;
