"use client";

import React from "react";

interface EditorialTitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchText({ text, className, style }: EditorialTitleProps) {
  return (
    <span className={`inline-block tracking-tight ${className || ""}`} style={style}>
      {text}
    </span>
  );
}
