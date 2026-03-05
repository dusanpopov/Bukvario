import { useRef, useEffect, useState } from "react";

export default function Canvas({ letter, onProgress, isLocked, onDrawStart }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const totalDist = useRef(0);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.font = "bold 350px Fredoka, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillText(letter, 250, 250);
  }, [letter]);

  const getXY = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (500 / rect.width),
      y: (clientY - rect.top) * (500 / rect.height),
    };
  };

  const handleMove = (e) => {
    if (!isDrawing || isLocked) return;
    const { x, y } = getXY(e);
    const ctx = canvasRef.current.getContext("2d");

    if (lastPos.current) {
      totalDist.current += Math.hypot(
        x - lastPos.current.x,
        y - lastPos.current.y,
      );
      if (totalDist.current > 80) onProgress(1);
      if (totalDist.current > 250) onProgress(2);
    }

    ctx.strokeStyle = "#10B981";
    ctx.lineWidth = 28;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#10B981";

    ctx.lineTo(x, y);
    ctx.stroke();
    lastPos.current = { x, y };
  };

  const startDrawing = (e) => {
    if (isLocked) return;
    onDrawStart();
    setIsDrawing(true);
    const { x, y } = getXY(e);
    lastPos.current = { x, y };
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      className="touch-none"
      onMouseDown={startDrawing}
      onMouseMove={handleMove}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
      onTouchStart={startDrawing}
      onTouchMove={handleMove}
      onTouchEnd={() => setIsDrawing(false)}
    />
  );
}
