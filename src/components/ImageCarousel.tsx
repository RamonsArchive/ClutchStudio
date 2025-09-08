"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Play, Pause } from "lucide-react";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const imageRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef<HTMLSpanElement[]>([]);
  const dotRef = useRef<HTMLSpanElement[]>([]);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [carousel, setCarousel] = useState({
    currentImage: 0,
    isPlaying: true,
    isLastImage: false,
  });

  const [mobile, setMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const { currentImage, isPlaying, isLastImage } = carousel;

  // Throttle function for smooth performance
  const throttle = useCallback(
    (func: (clientX: number, clientY: number) => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      let lastExecTime = 0;

      return function (clientX: number, clientY: number) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime > delay) {
          func(clientX, clientY);
          lastExecTime = currentTime;
        } else {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            func(clientX, clientY);
            lastExecTime = currentTime;
          }, delay - (currentTime - lastExecTime));
        }
      };
    },
    []
  );

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setMobile(isMobile);
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!isPlaying || isDragging) return;

    // Clear any existing interval first
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    interval.current = setInterval(() => {
      setCarousel((prev) => {
        const nextImage = prev.currentImage + 1;
        if (nextImage >= images.length) {
          return { ...prev, currentImage: 0, isLastImage: false };
        }
        return { ...prev, currentImage: nextImage };
      });
    }, 5000);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [isPlaying, images.length, isDragging]);

  // GSAP animation for image transitions
  useGSAP(() => {
    // Animate progress bar
    if (progressRef.current[currentImage]) {
      gsap.to(progressRef.current[currentImage], {
        clipPath: "circle(50% at center)",
        scale: 1,
        duration: 5,
        ease: "none",
        onComplete: () => {
          // Reset progress bar
          gsap.set(progressRef.current[currentImage], {
            clipPath: "circle(0% at center)",
            scale: 0,
          });
        },
      });
    }
  }, [currentImage]);

  // Handle play/pause
  const handlePlayPause = () => {
    setCarousel((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const resetInterval = useCallback(() => {
    // Clear any existing interval first
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    // Only set new interval if carousel is playing
    if (isPlaying) {
      interval.current = setInterval(() => {
        setCarousel((prev) => {
          const nextImage = prev.currentImage + 1;
          if (nextImage >= images.length) {
            return { ...prev, currentImage: 0 };
          }
          return { ...prev, currentImage: nextImage };
        });
      }, 5000);
    }
  }, [isPlaying, images.length]);

  // Handle manual navigation
  const handleImageSelect = (index: number) => {
    setCarousel((prev) => ({ ...prev, currentImage: index }));
    resetInterval();
  };

  // Touch/Mouse event handlers with throttling
  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(true);
      setStartX(clientX);
      setStartY(clientY);
      setCurrentX(clientX);
      setDragOffset(0);

      // Pause auto-advance while dragging
      if (interval.current) {
        clearInterval(interval.current);
      }
    },
    [interval]
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      // Buffer zone: only allow horizontal swipes if movement is clearly horizontal
      const minHorizontalMovement = 20; // 20px minimum horizontal movement
      const maxVerticalMovement = 30; // 30px maximum vertical movement allowed

      if (
        Math.abs(deltaX) < minHorizontalMovement ||
        Math.abs(deltaY) > maxVerticalMovement
      ) {
        return; // Don't process as horizontal swipe
      }

      const containerWidth = containerRef.current?.offsetWidth || 0;
      const imageWidth = containerWidth / images.length;

      // Limit drag distance to prevent over-scrolling
      const maxDragDistance = imageWidth * 0.8; // 80% of image width max
      const clampedDeltaX = Math.max(
        -maxDragDistance,
        Math.min(maxDragDistance, deltaX)
      );

      // Calculate drag offset as percentage
      const offsetPercent = (clampedDeltaX / imageWidth) * 100;
      setDragOffset(offsetPercent);
      setCurrentX(clientX);
    },
    [isDragging, startX, startY, images.length]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const containerWidth = containerRef.current?.offsetWidth || 0;
    const imageWidth = containerWidth / images.length;
    const threshold = imageWidth * 0.3; // 30% threshold for swipe

    if (Math.abs(currentX - startX) > threshold) {
      // Determine swipe direction
      if (currentX < startX) {
        // Swipe left - next image
        const nextImage = (currentImage + 1) % images.length;
        setCarousel((prev) => ({
          ...prev,
          currentImage: nextImage,
        }));
      } else {
        // Swipe right - previous image
        const prevImage =
          currentImage === 0 ? images.length - 1 : currentImage - 1;
        setCarousel((prev) => ({
          ...prev,
          currentImage: prevImage,
        }));
      }

      // Clear interval immediately and reset after state update
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }

      // Use setTimeout to ensure state has updated before resetting interval
      setTimeout(() => {
        resetInterval();
      }, 0);
    } else {
      // Even if swipe wasn't strong enough, reset interval
      // This gives user time to look at current image
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
      setTimeout(() => {
        resetInterval();
      }, 0);
    }

    // Reset drag state
    setDragOffset(0);
  }, [
    isDragging,
    currentX,
    startX,
    currentImage,
    images.length,
    resetInterval,
  ]);

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      throttle(handleMove, 16)(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      throttle(handleMove, 16)(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Reset progress bars
  useEffect(() => {
    progressRef.current.forEach((_, index) => {
      if (index === currentImage) {
        gsap.set(progressRef.current[index], {
          clipPath: "circle(0% at center)",
          scale: 0,
        });
      } else {
        gsap.set(progressRef.current[index], {
          clipPath: "circle(0% at center)",
          scale: 0,
        });
      }
    });
  }, [currentImage]);

  // Calculate transform with drag offset - memoized for performance
  const getTransformStyle = useMemo(() => {
    const baseTransform = (-100 * currentImage) / images.length;
    const dragTransform = dragOffset / images.length;
    return `translateX(${baseTransform + dragTransform}%)`;
  }, [currentImage, dragOffset, images.length]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full h-full transition-transform duration-300 ease-out"
          style={{
            width: `${images.length * 100}%`,
            transform: getTransformStyle,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <div className="w-full h-full flex-center overflow-hidden bg-black relative">
                <img
                  src={image}
                  alt={`project image ${index + 1}`}
                  ref={(el) => {
                    if (el) {
                      imageRef.current[index] = el;
                    }
                  }}
                  className="w-full h-full max-h-[650px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-row w-full max-w-md items-center gap-5">
          <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
            {images.map((_, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) {
                    dotRef.current[index] = el;
                  }
                }}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 relative ${
                  index === currentImage ? "bg-white" : "bg-white/40"
                }`}
                onClick={() => handleImageSelect(index)}
              >
                {/* Progress bar overlay - circular fill */}
                <span
                  ref={(el) => {
                    if (el) {
                      progressRef.current[index] = el;
                    }
                  }}
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    index === currentImage ? "bg-blue-400" : "bg-transparent"
                  }`}
                  style={{
                    clipPath:
                      index === currentImage
                        ? "circle(0% at center)"
                        : "circle(0% at center)",
                    transform: "scale(0)",
                  }}
                />
              </span>
            ))}
          </div>
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
