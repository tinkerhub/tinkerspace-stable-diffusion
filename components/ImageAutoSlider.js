import React, { useState, useEffect } from "react";
import { useRecentImages } from "@hooks/index";
/**
 * 
 * @param {*} param { interval = milliseconds } default 20 seconds
 * @returns 
 */
const ImageAutoSlider = ({ interval = 10000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, loading, error] = useRecentImages({ limit: 30 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, items?.length]);

  return (
    <div>
      {items && items[currentIndex]?.url && (
        <>
          <img
            src={items[currentIndex]?.url}
            alt={items[currentIndex]?.text}
            className="w-full h-screen object-cover"
          />
          <div className="absolute w-full bottom-0 p-5 bg-black bg-opacity-80">
            {/* Make the text of size 60px in Tailwind*/}
            <p className="text-white text-4xl">{items[currentIndex]?.text}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageAutoSlider;
