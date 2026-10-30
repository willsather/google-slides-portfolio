"use client";

import type React from "react";

export default function Sidebar({
  slides,
  currentSlide,
  setCurrentSlide,
}: {
  slides: {
    name: string;
    url: string;
    title: string;
    description: string;
    component?: React.ComponentType;
  }[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
}) {
  return (
    <div className="w-48 space-y-4 overflow-y-scroll border-r p-4">
      {slides.map((slide, index) => (
        <button
          key={slide.name}
          type="button"
          className={`flex aspect-video w-full cursor-pointer flex-col rounded-lg border-2 text-left transition-colors hover:border-gray-400 ${
            currentSlide === index ? "border-primary" : ""
          }`}
          onClick={() => setCurrentSlide(index)}
        >
          <span className="flex items-center justify-between p-2 text-xs">
            <span>{index + 1}</span>
            <span className="text-muted-foreground truncate text-[10px]">
              {slide.name}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
