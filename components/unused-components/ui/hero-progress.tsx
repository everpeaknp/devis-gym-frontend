"use client";

import { Progress } from "@ark-ui/react/progress";

interface HeroProgressProps {
  value: number;
  size?: number;
  showValue?: boolean;
  children?: React.ReactNode;
}

export default function HeroProgress({ 
  value, 
  size = 32, 
  showValue = false,
  children 
}: HeroProgressProps) {
  return (
    <Progress.Root
      value={value}
      className="flex items-center justify-center relative"
    >
      <Progress.Circle 
        className={`w-${size} h-${size}`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          '--size': `${size}px`,
          '--thickness': '2px'
        } as React.CSSProperties}
      >
        <Progress.CircleTrack
          className="stroke-white/20"
          strokeWidth="2"
          fill="none"
        />
        <Progress.CircleRange
          className="stroke-white transition-all duration-300 ease-out"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </Progress.Circle>
      
      {/* Content overlay */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-bold">
          {children}
        </div>
      )}
      
      {/* Progress value */}
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-[8px] font-bold">
          {Math.round(value)}%
        </div>
      )}
    </Progress.Root>
  );
}