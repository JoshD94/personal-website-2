import { FC, useState, useCallback, useEffect, useRef } from "react";
import { PhotoData } from "./types";

type PhotoStackProps = {
  images: PhotoData[];
  autoRotateInterval?: number; // in milliseconds
  pauseOnHover?: boolean;
};

const PhotoStack: FC<PhotoStackProps> = ({
  images,
  autoRotateInterval = 3000,
  pauseOnHover = true,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const rotateStack = useCallback(() => {
    if (!transitioning) {
      setTransitioning(true);
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

      // Reset transitioning state after animation completes
      setTimeout(() => {
        setTransitioning(false);
      }, 500);
    }
  }, [transitioning, images.length]);

  // Handle auto-rotation
  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(rotateStack, autoRotateInterval);
    };

    if (!isPaused) {
      startTimer();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeIndex, isPaused, autoRotateInterval, rotateStack]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleClick = () => {
    // Reset the timer and do the rotation
    rotateStack();
    // Briefly pause auto-rotation after manual interaction
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoRotateInterval);
  };

  return (
    <div
      className="relative h-70 w-64 mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((imgSrc: PhotoData, index: number) => {
        const isActive = index === activeIndex;
        const offset = (index - activeIndex + images.length) % images.length;
        const isMovingToBack =
          index === activeIndex - 1 ||
          (activeIndex === 0 && index === images.length - 1);

        return (
          <div
            key={index}
            className="absolute inset-0 transition-all duration-500 ease-in-out cursor-pointer bg-white p-4 shadow-xl"
            style={{
              transform: isMovingToBack
                ? `perspective(1000px)
                   translateZ(-${(images.length + 1) * 5}px)
                   translateY(${(images.length + 1) * 3}px)
                   rotate(${(images.length + 1) * 0.5}deg)`
                : `perspective(1000px)
                   translateZ(-${offset * 5}px)
                   translateY(${offset * 5}px)
                   rotate(${offset * 0.5}deg)`,
              zIndex: isMovingToBack ? -1 : images.length - offset,
              opacity: 1,
              pointerEvents: transitioning ? "none" : "auto",
            }}
            onClick={handleClick}
          >
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={imgSrc.src}
                alt={`Stack photo ${index + 1}`}
                className="w-full h-[85%] object-cover"
              />
              {/* Bottom white space of Polaroid */}
              <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-white">
                <div className="text-center text-xs font-normal p-2">
                  {<p>{imgSrc.caption}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PhotoStack;
