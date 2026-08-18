import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Animate progress bar smoothly
    const timeout1 = setTimeout(() => {
      setProgress(100);
    }, 100);

    const timeout2 = setTimeout(() => {
      setIsFading(true);
      if (onComplete) onComplete();
    }, 1000);

    const timeout3 = setTimeout(() => {
      setIsMounted(false);
    }, 1800);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div className={`preloader ${isFading ? 'fade-out' : ''}`}>
      <div>
        <div className="preloader-title">
          JOÃO <em>LAMIM</em>
        </div>
        <div className="preloader-bar">
          <div
            className="preloader-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
