import { useRef, useEffect, useState, useCallback } from "react";

const DRAW_THRESHOLD_1 = 80;
const DRAW_THRESHOLD_2 = 250;

export default function Canvas({
  letter,
  onProgress,
  isLocked,
  onDrawStart,
  progress,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  const totalDist = useRef(0);
  const lastPos = useRef(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const size = Math.min(parent.clientWidth, parent.clientHeight);

    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    ctx.font = `bold ${Math.floor(width * 0.7)}px Fredoka, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.15)";

    ctx.fillText(letter, width / 2, height / 2);

    totalDist.current = 0;
    lastPos.current = null;
  }, [letter]);

  const getXY = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (!isDrawing || isLocked) return;

      e.preventDefault();

      const ctx = ctxRef.current;
      if (!ctx) return;

      const { x, y } = getXY(e);

      if (lastPos.current) {
        const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);

        totalDist.current += dist;

        if (totalDist.current > DRAW_THRESHOLD_1 && progress < 1) {
          onProgress(1);
        }

        if (totalDist.current > DRAW_THRESHOLD_2 && progress < 2) {
          onProgress(2);
        }
      }

      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 20;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#10B981";

      ctx.lineTo(x, y);
      ctx.stroke();

      lastPos.current = { x, y };
    },
    [getXY, isDrawing, isLocked, onProgress, progress],
  );

  const startDrawing = useCallback(
    (e) => {
      if (isLocked) return;

      const ctx = ctxRef.current;
      if (!ctx) return;

      onDrawStart();
      setIsDrawing(true);

      const { x, y } = getXY(e);

      lastPos.current = { x, y };

      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [getXY, isLocked, onDrawStart],
  );

  return (
    <canvas
      ref={canvasRef}
      className="touch-none w-full h-full"
      onMouseDown={startDrawing}
      onMouseMove={handleMove}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={handleMove}
      onTouchEnd={stopDrawing}
    />
  );
}
