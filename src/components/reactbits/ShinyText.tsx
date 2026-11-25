"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 4,
  className = "",
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent font-medium ${
        disabled
          ? "text-[#FDF8F0]"
          : "bg-[linear-gradient(110deg,#FDF8F0_35%,#FF6B00_50%,#FDF8F0_65%)] bg-[length:200%_100%] animate-[shine_linear_infinite]"
      } ${className}`}
      style={{
        animationDuration: disabled ? undefined : animationDuration,
      }}
    >
      {text}
    </span>
  );
}
