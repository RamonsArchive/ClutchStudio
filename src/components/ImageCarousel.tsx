"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import Image from "next/image";

const SLIDE_DURATION = 5; // seconds each image stays up while playing

const formatPlate = (n: number) => String(n).padStart(2, "0");

const ImageCarousel = ({ images }: { images: string[] }) => {
  const progressRef = useRef<HTMLSpanElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const [carousel, setCarousel] = useState({
    currentImage: 0,
    isPlaying: true,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Only auto-advance while the carousel is on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { currentImage, isPlaying } = carousel;
  const imageCount = images?.length ?? 0;
  const hasMultiple = imageCount > 1;

  // Auto-advance is paused while dragging or while the lightbox is open
  const isAdvancing =
    isPlaying && isInView && !isDragging && !isLightboxOpen && hasMultiple;

  const goToNext = useCallback(() => {
    setCarousel((prev) => ({
      ...prev,
      currentImage: (prev.currentImage + 1) % imageCount,
    }));
  }, [imageCount]);

  const goToPrev = useCallback(() => {
    setCarousel((prev) => ({
      ...prev,
      currentImage:
        prev.currentImage === 0 ? imageCount - 1 : prev.currentImage - 1,
    }));
  }, [imageCount]);

  // Auto-advance carousel every 5 seconds.
  // Keyed on currentImage so any manual navigation restarts the timer.
  useEffect(() => {
    if (!isAdvancing) return;

    const timeout = setTimeout(goToNext, SLIDE_DURATION * 1000);
    return () => clearTimeout(timeout);
  }, [isAdvancing, currentImage, goToNext]);

  // GSAP animation for the progress bar inside the active indicator
  useGSAP(
    () => {
      const bars = progressRef.current.filter(Boolean);
      if (bars.length === 0) return;

      gsap.set(bars, { scaleX: 0 });

      const activeBar = progressRef.current[currentImage];
      if (!activeBar) return;

      if (isAdvancing) {
        gsap.to(activeBar, {
          scaleX: 1,
          duration: SLIDE_DURATION,
          ease: "none",
        });
      } else {
        // Paused: show the active indicator as full
        gsap.set(activeBar, { scaleX: 1 });
      }
    },
    { dependencies: [currentImage, isAdvancing, imageCount] }
  );

  // Lightbox fade-in
  useGSAP(
    () => {
      if (!isLightboxOpen || !lightboxRef.current) return;
      gsap.fromTo(
        lightboxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" }
      );
    },
    { dependencies: [isLightboxOpen] }
  );

  // Lightbox: keyboard controls + lock page scroll
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowRight") goToNext();
      if (event.key === "ArrowLeft") goToPrev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, goToNext, goToPrev]);

  // Handle play/pause
  const handlePlayPause = () => {
    setCarousel((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  // Handle manual navigation
  const handleImageSelect = (index: number) => {
    setCarousel((prev) => ({ ...prev, currentImage: index }));
  };

  // Touch/Mouse drag handlers
  const handleStart = (clientX: number, clientY: number) => {
    if (!hasMultiple) return;
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
    setCurrentX(clientX);
    setDragOffset(0);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Buffer zone: allow swipe with mild vertical movement, but prefer clear horizontal intent
    const minHorizontalMovement = 10; // require at least 10px horizontal movement
    const maxVerticalMovement = 40; // allow up to 40px vertical wiggle before cancelling swipe

    if (
      Math.abs(deltaX) < minHorizontalMovement ||
      Math.abs(deltaY) > maxVerticalMovement
    ) {
      return; // Don't process as horizontal swipe
    }

    const imageWidth = containerRef.current?.offsetWidth || 1;

    // Limit drag distance to prevent over-scrolling
    const maxDragDistance = imageWidth * 0.8; // 80% of image width max
    const clampedDeltaX = Math.max(
      -maxDragDistance,
      Math.min(maxDragDistance, deltaX)
    );

    // Calculate drag offset as a percentage of one image
    setDragOffset((clampedDeltaX / imageWidth) * 100);
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const imageWidth = containerRef.current?.offsetWidth || 1;
    const threshold = Math.min(imageWidth * 0.2, 90); // easy to trigger, even on wide screens

    if (Math.abs(currentX - startX) > threshold) {
      if (currentX < startX) {
        goToNext(); // Swipe left - next image
      } else {
        goToPrev(); // Swipe right - previous image
      }
    }

    // Reset drag state
    setDragOffset(0);
  };

  // Mouse events for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events for mobile (vertical page scroll stays native via `touch-pan-y`)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  if (imageCount === 0) return null;

  // Track is `imageCount` images wide, so one image = 100 / imageCount percent
  const trackTransform = `translateX(${
    (-100 * currentImage + dragOffset) / imageCount
  }%)`;

  const controlButtonClassName =
    "flex-center w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/10 bg-primary-background-950/80 text-slate-200 transition-all duration-300 ease-out hover:border-primary-500/60 hover:text-primary-300";

  return (
    <div className="group/carousel relative flex flex-col w-full h-full rounded-2xl overflow-hidden bg-primary-background-900">
      <div
        ref={containerRef}
        className={`relative w-full flex-1 min-h-0 overflow-hidden touch-pan-y select-none ${
          hasMultiple ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            width: `${imageCount * 100}%`,
            transform: trackTransform,
            transition: isDragging
              ? "none"
              : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-full shrink-0 bg-primary-background-900"
              style={{ width: `${100 / imageCount}%` }}
              aria-hidden={index !== currentImage}
            >
              <Image
                src={image}
                alt={`project image ${index + 1}`}
                fill
                sizes="(min-width: 1280px) 1100px, 95vw"
                priority={index === 0}
                loading={
                  index === 0
                    ? undefined
                    : Math.abs(index - currentImage) <= 1
                      ? "eager"
                      : "lazy"
                }
                draggable={false}
                className="object-contain p-2 sm:p-3"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Previous / next arrows (desktop hover; mobile swipes) */}
      {hasMultiple && (
        <>
          <div className="absolute left-3 top-[calc(50%-24px)] -translate-y-1/2 z-20 hidden sm:block opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 focus-within:opacity-100">
            <button
              onClick={goToPrev}
              aria-label="Previous image"
              className={`group/arrow ${controlButtonClassName}`}
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover/arrow:-translate-x-0.5" />
            </button>
          </div>
          <div className="absolute right-3 top-[calc(50%-24px)] -translate-y-1/2 z-20 hidden sm:block opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100 focus-within:opacity-100">
            <button
              onClick={goToNext}
              aria-label="Next image"
              className={`group/arrow ${controlButtonClassName}`}
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/arrow:translate-x-0.5" />
            </button>
          </div>
        </>
      )}

      {/* Control bar: plate label, progress indicators, play/pause, full screen */}
      <div className="flex items-center justify-between gap-3 shrink-0 h-12 px-3 md:px-4 border-t border-white/10 bg-primary-background-950/60">
        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-slate-300 whitespace-nowrap">
          <span className="hidden sm:inline">Plate Nº </span>
          {formatPlate(currentImage + 1)}
          <span className="text-slate-500"> / {formatPlate(imageCount)}</span>
        </span>

        {hasMultiple && (
          <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentImage}
                className="group/dot flex items-center h-8"
              >
                <span
                  className={`relative block h-1.5 rounded-full overflow-hidden transition-all duration-300 ease-out ${
                    index === currentImage
                      ? "w-7 bg-white/20"
                      : "w-1.5 bg-white/30 group-hover/dot:bg-white/70"
                  }`}
                >
                  {/* Progress bar overlay */}
                  <span
                    ref={(el) => {
                      if (el) {
                        progressRef.current[index] = el;
                      }
                    }}
                    className={`absolute inset-0 rounded-full origin-left ${
                      index === currentImage
                        ? "bg-primary-500"
                        : "bg-transparent"
                    }`}
                    style={{ transform: "scaleX(0)" }}
                  />
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          {hasMultiple && (
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              className={controlButtonClassName}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            onClick={() => setIsLightboxOpen(true)}
            aria-label="View image full screen"
            className={controlButtonClassName}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lightbox (portalled to <body> so it always covers the whole screen) */}
      {isLightboxOpen &&
        createPortal(
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[200] flex flex-col bg-primary-background-950/97 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4 border-b border-white/10">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-slate-300">
                Plate Nº {formatPlate(currentImage + 1)}
                <span className="text-slate-500">
                  {" "}
                  / {formatPlate(imageCount)}
                </span>
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close image viewer"
                autoFocus
                className={controlButtonClassName}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-1 min-h-0 m-3 md:m-6">
              <Image
                key={images[currentImage]}
                src={images[currentImage]}
                alt={`project image ${currentImage + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {hasMultiple && (
              <div
                className="flex items-center justify-center gap-3 px-4 pb-4 md:pb-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={goToPrev}
                  aria-label="Previous image"
                  className={controlButtonClassName}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  aria-label="Next image"
                  className={controlButtonClassName}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ImageCarousel;
