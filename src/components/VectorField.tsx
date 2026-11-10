"use client";
import React, { useEffect, useRef } from "react";

/**
 * Interactive vector field (the "vector" in rvector).
 * A grid of short line segments that rotate to point at the cursor, with a
 * slow ambient flow when the pointer is away. Drawn on one canvas and only
 * animated while it is on screen.
 */
const VectorField = ({
  className = "",
  spacing = 46,
}: {
  className?: string;
  spacing?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      const t = time * 0.00025;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;
      const reach = 260;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * spacing;
          const y = offsetY + j * spacing;

          // Ambient flow field
          let angle =
            Math.sin(x * 0.004 + t * 2) * 0.9 + Math.cos(y * 0.005 - t) * 0.9;
          let strength = 0;

          if (pointer.active) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const dist = Math.hypot(dx, dy);
            if (dist < reach) {
              strength = 1 - dist / reach;
              const toward = Math.atan2(dy, dx);
              // Blend ambient angle toward the pointer
              angle = angle + (toward - angle) * strength;
            }
          }

          const length = 5 + strength * 9;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);

          ctx.strokeStyle =
            strength > 0.02
              ? `rgba(35, 196, 225, ${0.14 + strength * 0.7})`
              : "rgba(148, 197, 233, 0.13)";
          ctx.lineWidth = 1 + strength * 0.8;
          ctx.beginPath();
          ctx.moveTo(x - cos * length, y - sin * length);
          ctx.lineTo(x + cos * length, y + sin * length);
          ctx.stroke();

          // Arrow head only near the pointer: orange tip
          if (strength > 0.25) {
            ctx.fillStyle = `rgba(251, 94, 1, ${strength})`;
            ctx.beginPath();
            ctx.arc(x + cos * length, y + sin * length, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (visible && !reduceMotion) frame = requestAnimationFrame(loop);
    };

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height;
    };

    // Only animate while on screen
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reduceMotion) frame = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    if (finePointer) {
      window.addEventListener("pointermove", handleMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [spacing]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};

export default VectorField;
