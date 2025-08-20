"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Play, Pause } from "lucide-react";
import useMobile from "./useMobile";

const ImageCarousel = ({ images }: { images: string[] }) => {
  const imageRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef<HTMLSpanElement[]>([]);
  const dotRef = useRef<HTMLSpanElement[]>([]);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const { isMobile } = useMobile();

  const [carousel, setCarousel] = useState({
    currentImage: 0,
    isPlaying: true,
    isLastImage: false,
  });

  const { currentImage, isPlaying, isLastImage } = carousel;

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!isPlaying) return;

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
  }, [isPlaying, images.length]);

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

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-1500 ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(${(-100 * currentImage) / images.length}%)`,
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
                  className="object-cover"
                  sizes={isMobile ? "100vw" : "50vw"}
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

      {/* Play/Pause Button */}
      {/* <div className="absolute top-4 right-4 z-20">
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
      </div> */}
    </div>
  );
};

export default ImageCarousel;
