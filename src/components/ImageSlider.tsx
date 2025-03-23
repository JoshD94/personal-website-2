import { FC, useState, useEffect, useCallback } from "react";
import { PhotoData } from "./types";

interface ImageSliderProps {
  images: PhotoData[];
  autoSlideInterval?: number;
}

const ImageSlider: FC<ImageSliderProps> = ({ 
  images, 
  autoSlideInterval = 3000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (images.length <= 1) return;
    
    // Add a small delay to ensure the previous transition completes fully
    const interval = setInterval(() => {
      // Only transition if we're not currently in a transition
      goToNext();
    }, autoSlideInterval);
    
    return () => clearInterval(interval);
  }, [goToNext, images.length, autoSlideInterval]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt={image.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
            {image.caption}
          </div>
        </div>
      ))}
      
      {images.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 focus:outline-none"
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 focus:outline-none"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;