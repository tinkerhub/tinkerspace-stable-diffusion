import { useLatestItem } from "@hooks/index";
import React, { useEffect, useState } from "react";
import ImageAutoSlider from "@components/ImageAutoSlider";

const SHOW_IMAGE_SLIDER_AFTER = 5; // minutes

/**
 *  Function to check if the image slider should be shown
 * @param {Timestamp} lastCompletedAt last completed image timestamp
 * @returns Boolean
 */
const showImageAutoSlider = (lastCompletedAt) => {
  if (!lastCompletedAt) return false;
  const milliseconds = new Date() - new Date(lastCompletedAt);
  const minutes = Math.floor(milliseconds / 60000);
  // Show the image slider based on the time
  if (minutes >= SHOW_IMAGE_SLIDER_AFTER) {
    return true;
  } else {
    return false;
  }
};

export default function ImageSlide() {
  const [latestItem, loadingLatest, errorLatest] = useLatestItem();
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (latestItem?.completed_at) {
      setShowSlider(showImageAutoSlider(latestItem?.completed_at));
    }
    // useEffect will only call on the update of lastItem, so we need to check after the time again
    const timeout = setTimeout(() => {
      setShowSlider(showImageAutoSlider(latestItem?.completed_at));
    }, 60000 * SHOW_IMAGE_SLIDER_AFTER); // call the effect again after SHOW_IMAGE_SLIDER_AFTER minutes
    return () => clearTimeout(timeout);
  }, [latestItem]);

  if (showSlider) {
    return <ImageAutoSlider />;
  }

  return (
    <div>
      {loadingLatest && <div className="text-lg p-5">Loading ...</div>}
      {errorLatest && <div className="text-lg p-5">Error</div>}
      {latestItem && (
        <img
          src={latestItem?.url}
          alt={latestItem?.text}
          className="w-full h-screen object-cover"
        />
      )}
      {latestItem && (
        <div className="absolute w-full bottom-0 p-5 bg-black bg-opacity-80">
          {/* Make the text of size 60px in Tailwind*/}
          <p className="text-white text-3xl">{latestItem?.text}</p>
        </div>
      )}
    </div>
  );
}
