"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const { currentImage, isPlaying, isLastImage } = carousel;

  // Throttle function for smooth performance
  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;

    return function (this: any, ...args: any[]) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = currentTime;
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setMobile(isMobile);
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!isPlaying || isDragging) return;

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

  const resetInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
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
  };

  // Handle manual navigation
  const handleImageSelect = (index: number) => {
    setCarousel((prev) => ({ ...prev, currentImage: index }));
    resetInterval();
  };

  // Touch/Mouse event handlers with throttling
  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setDragOffset(0);

    // Pause auto-advance while dragging
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  const handleMove = useCallback(
    throttle((clientX: number) => {
      if (!isDragging) return;

      const deltaX = clientX - startX;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const imageWidth = containerWidth / images.length;

      // Calculate drag offset as percentage
      const offsetPercent = (deltaX / imageWidth) * 100;
      setDragOffset(offsetPercent);
      setCurrentX(clientX);
    }, 16),
    [isDragging, startX, images.length]
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
        setCarousel((prev) => {
          const nextImage = prev.currentImage + 1;
          if (nextImage >= images.length) {
            return { ...prev, currentImage: 0, isLastImage: false };
          }
          return { ...prev, currentImage: nextImage };
        });
      } else {
        // Swipe right - previous image
        setCarousel((prev) => {
          const prevImage = prev.currentImage - 1;
          if (prevImage < 0) {
            return {
              ...prev,
              currentImage: images.length - 1,
              isLastImage: true,
            };
          }
          return { ...prev, currentImage: prevImage };
        });
      }
    }

    // Reset drag state
    setDragOffset(0);

    // Resume auto-advance
    resetInterval();
  }, [isDragging, currentX, startX, images.length]);

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX);
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

  // Calculate transform with drag offset
  const getTransformStyle = () => {
    const baseTransform = (-100 * currentImage) / images.length;
    const dragTransform = dragOffset / images.length;
    return `translateX(${baseTransform + dragTransform}%)`;
  };

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
            transform: getTransformStyle(),
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
                <Image
                  src={image}
                  alt={`project image ${index + 1}`}
                  fill
                  ref={(el) => {
                    if (el) {
                      imageRef.current[index] = el;
                    }
                  }}
                  className="object-contain"
                  sizes={mobile ? "80vw" : "40vw"}
                  priority={index === 0}
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
