"use client";

import * as React from "react";

type WordPatch = {
  word: string;
  cx: number;
  cy: number;
  scale: number;
  rotDeg: number;
  fill: [number, number, number];
  ink: [number, number, number];
  border: [number, number, number];
  stitchDeg: number;
};

// Gym-related words for your fitness website
const WORDS: WordPatch[] = [
  {
    word: "STRONG",
    cx: 0.44, cy: 0.29, scale: 0.32, rotDeg: -4,
    fill: [0.42, 0.62, 0.92],
    ink: [0.09, 0.09, 0.1],
    border: [0.97, 0.97, 0.98],
    stitchDeg: 70,
  },
  {
    word: "FIT",
    cx: 0.6, cy: 0.51, scale: 0.28, rotDeg: 3,
    fill: [0.96, 0.82, 0.36],
    ink: [0.09, 0.09, 0.1],
    border: [0.98, 0.98, 0.96],
    stitchDeg: 20,
  },
  {
    word: "ELITE",
    cx: 0.48, cy: 0.72, scale: 0.34, rotDeg: -2,
    fill: [0.9, 0.62, 0.82],
    ink: [0.09, 0.09, 0.1],
    border: [0.98, 0.97, 0.98],
    stitchDeg: 100,
  },
];

const FABRIC: [number, number, number] = [0.16, 0.13, 0.2];
// Base64 encoded embroidery texture data (truncated for brevity)
const EMBROIDERY_WEAVE_URL = "data:image/webp;base64,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"

// Utility functions for RGB conversion
const rgbToStyle = (rgb: [number, number, number]): string => 
  `rgb(${Math.round(rgb[0] * 255)}, ${Math.round(rgb[1] * 255)}, ${Math.round(rgb[2] * 255)})`;

const darkenRgb = (rgb: [number, number, number], factor: number = 0.7): [number, number, number] =>
  [rgb[0] * factor, rgb[1] * factor, rgb[2] * factor];
interface EmbroideredWordPatchesProps {
  width?: number;
  height?: number;
  className?: string;
}

export function EmbroideredWordPatches({ 
  width = 400, 
  height = 300, 
  className = "" 
}: EmbroideredWordPatchesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawPatch = React.useCallback((
    ctx: CanvasRenderingContext2D,
    patch: WordPatch,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const { word, cx, cy, scale, rotDeg, fill, ink, border, stitchDeg } = patch;
    
    ctx.save();
    
    // Position and rotate
    ctx.translate(cx * canvasWidth, cy * canvasHeight);
    ctx.rotate((rotDeg * Math.PI) / 180);
    
    // Calculate text size
    const fontSize = Math.min(canvasWidth, canvasHeight) * scale * 0.5;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    const textMetrics = ctx.measureText(word);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;
    
    // Patch background with border
    const padding = 20;
    const patchWidth = textWidth + padding * 2;
    const patchHeight = textHeight + padding;
    
    // Draw border
    ctx.fillStyle = rgbToStyle(border);
    ctx.fillRect(-patchWidth/2 - 2, -patchHeight/2 - 2, patchWidth + 4, patchHeight + 4);
    
    // Draw fill
    ctx.fillStyle = rgbToStyle(fill);
    ctx.fillRect(-patchWidth/2, -patchHeight/2, patchWidth, patchHeight);
    
    // Add subtle texture effect
    const gradient = ctx.createLinearGradient(-patchWidth/2, -patchHeight/2, patchWidth/2, patchHeight/2);
    gradient.addColorStop(0, rgbToStyle(fill));
    gradient.addColorStop(0.5, rgbToStyle([fill[0] * 1.1, fill[1] * 1.1, fill[2] * 1.1]));
    gradient.addColorStop(1, rgbToStyle(darkenRgb(fill, 0.9)));
    ctx.fillStyle = gradient;
    ctx.fillRect(-patchWidth/2, -patchHeight/2, patchWidth, patchHeight);
    
    // Draw text
    ctx.fillStyle = rgbToStyle(ink);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, 0, 0);
    
    // Add embroidery stitch effect
    ctx.strokeStyle = rgbToStyle(darkenRgb(fill, 0.6));
    ctx.lineWidth = 1;
    const stitchAngle = (stitchDeg * Math.PI) / 180;
    const stitchSpacing = 8;
    
    for (let i = -patchWidth/2; i < patchWidth/2; i += stitchSpacing) {
      ctx.beginPath();
      ctx.moveTo(i, -patchHeight/2);
      ctx.lineTo(i + Math.cos(stitchAngle) * 6, -patchHeight/2 + Math.sin(stitchAngle) * 6);
      ctx.stroke();
    }
    
    ctx.restore();
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Draw fabric background
    ctx.fillStyle = rgbToStyle(FABRIC);
    ctx.fillRect(0, 0, width, height);
    
    // Add fabric texture
    const img = new Image();
    img.onload = () => {
      ctx.globalAlpha = 0.1;
      ctx.drawImage(img, 0, 0, width, height);
      ctx.globalAlpha = 1;
      
      // Draw all patches
      WORDS.forEach(patch => {
        drawPatch(ctx, patch, width, height);
      });
    };
    img.src = EMBROIDERY_WEAVE_URL;
    
    // Fallback if image fails to load
    img.onerror = () => {
      WORDS.forEach(patch => {
        drawPatch(ctx, patch, width, height);
      });
    };
  }, [width, height, drawPatch]);

  return (
    <div className={`inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="rounded-lg shadow-lg"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          imageRendering: 'auto'
        }}
      />
    </div>
  );
}