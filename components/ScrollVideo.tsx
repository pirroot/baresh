"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 152;
const FPS = 30;

// Preload frames using Image objects
function preloadFrames(
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(4, "0");
      img.src = `/frames/frame_${frameNum}.webp`;
      img.onload = img.onerror = () => {
        loaded++;
        onProgress?.(loaded, TOTAL_FRAMES);
        if (loaded === TOTAL_FRAMES) resolve(images);
      };
      images[i] = img;
    }
  });
}

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Draw a specific frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = framesRef.current[index];
    if (!canvas || !ctx || !img?.complete) return;

    const { width, height } = canvas;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const sx = (width - sw) / 2;
    const sy = (height - sh) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Resize canvas to match viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Scroll handler: map scroll progress → frame index
  useEffect(() => {
    if (!ready) return;

    const scrollHeight = document.body.scrollHeight - window.innerHeight;

    const onScroll = () => {
      const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      const targetFrame = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(targetFrame));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // draw initial frame
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready, drawFrame]);

  // Load frames on mount
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    preloadFrames((loaded, total) => {
      setLoadProgress(Math.round((loaded / total) * 100));
    }).then((imgs) => {
      framesRef.current = imgs;
      setReady(true);
      drawFrame(0);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas, drawFrame]);

  return (
    <>
      {/* Scroll spacer — controls how long the animation plays */}
      <div style={{ height: `${(TOTAL_FRAMES / FPS) * 300}px` }} aria-hidden />

      {/* Sticky full-viewport canvas */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: "#000",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />

        {/* Loading overlay */}
        {!ready && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#000",
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
              gap: "1rem",
            }}
          >
            <div style={{ fontSize: "0.875rem", letterSpacing: "0.15em", opacity: 0.5 }}>
              LOADING
            </div>
            <div
              style={{
                width: "200px",
                height: "2px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${loadProgress}%`,
                  background: "#fff",
                  borderRadius: "999px",
                  transition: "width 0.1s ease",
                }}
              />
            </div>
            <div style={{ fontSize: "0.75rem", opacity: 0.35 }}>
              {loadProgress}%
            </div>
          </div>
        )}

        {/* Scroll hint */}
        {ready && (
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              animation: "fadeInUp 1s ease forwards",
              pointerEvents: "none",
            }}
          >
            <span>SCROLL</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="0.5" y="0.5" width="15" height="23" rx="7.5" stroke="currentColor" strokeOpacity="0.4" />
              <rect x="7" y="4" width="2" height="5" rx="1" fill="currentColor" opacity="0.6">
                <animate attributeName="y" values="4;12;4" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
              </rect>
            </svg>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
}
