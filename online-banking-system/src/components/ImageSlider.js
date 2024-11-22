import { useState, useEffect } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "opacity 1s ease-in-out, transform 1s ease-in-out", 
  opacity: 0,
  transform: "scale(0.95)", 
};

const slideContainerStyles = {
  position: "relative",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const textOverlayStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff",
  fontFamily: "'Segoe UI Variable', sans-serif",
  fontSize: "4vw", 
  fontWeight: "bold",
  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
  zIndex: 2,
  textAlign: "center",
  padding: "0 10px", 
  maxWidth: "80%", 
  boxSizing: "border-box",
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(1); 
  const bankID = localStorage.getItem("bankID")

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setFade(0); 
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(1); 
    }, 1000); 
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setFade(0); 
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFade(1); 
    }, 1000); 
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const slideStylesWithBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
    opacity: fade,
    transform: fade === 0 ? "scale(0.95)" : "scale(1)", 
  };

  return (
    <div style={slideContainerStyles}>
      <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
      </div>
      <div onClick={goToNext} style={rightArrowStyles}>
        ❱
      </div>
      <div style={slideStylesWithBackground}></div>
      <div style={textOverlayStyles}>
        <h1 style={{ margin: "0", fontSize: "2.5vw" }}>{slides[currentIndex].title}</h1>
        <p style={{ margin: "0", fontSize: "1.5vw" }}>{slides[currentIndex].description}</p>
      </div>
    </div>
  );
};

export default ImageSlider;


