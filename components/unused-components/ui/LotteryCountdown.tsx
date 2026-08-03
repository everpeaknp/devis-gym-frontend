"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function LotteryCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set lottery end date (example: 7 days from now)
    const lotteryEndDate = new Date();
    lotteryEndDate.setDate(lotteryEndDate.getDate() + 7);
    lotteryEndDate.setHours(23, 59, 59, 999);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = lotteryEndDate.getTime() - now;

      if (distance < 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 px-6 py-8 border border-accent/30">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <p className="font-oswald text-[14px] leading-[20px] font-bold uppercase tracking-wide text-accent">
              Special Offer Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 px-6 py-8 border border-accent/30 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-shimmer" />
      
      <div className="relative z-10 text-center">
        {/* Title */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <p className="font-oswald text-[14px] leading-[20px] font-bold uppercase tracking-wide text-accent">
            Limited Time Offer - Price Lottery
          </p>
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        </div>

        <p className="text-[12px] leading-[16px] text-zinc-400 mb-6">
          Hurry! Special discounted prices end in:
        </p>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          <Separator />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <Separator />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <Separator />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>

        {/* Call to Action */}
        <p className="mt-6 text-[11px] leading-[16px] font-bold uppercase tracking-wide text-accent">
          Join now and lock in your special rate forever!
        </p>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-black/40 border border-accent/30 px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[70px]">
          <span className="font-oswald text-[28px] md:text-[36px] leading-none font-bold text-accent">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="mt-2 font-oswald text-[10px] md:text-[11px] leading-[14px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-accent text-[24px] md:text-[32px] font-bold animate-pulse">
      :
    </div>
  );
}
