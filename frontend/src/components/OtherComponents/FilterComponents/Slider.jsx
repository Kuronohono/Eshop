import React, { useMemo } from "react";

const Slider = ({ min = 0, max = 500, value = [50, 200], step = 1, onChange }) => {
  const [leftValue, rightValue] = value;

  const safeLeft = useMemo(
    () => Math.max(min, Math.min(leftValue, rightValue - step)),
    [leftValue, rightValue, min, step]
  );
  const safeRight = useMemo(
    () => Math.min(max, Math.max(rightValue, leftValue + step)),
    [rightValue, leftValue, max, step]
  );
  const leftPercent = ((safeLeft - min) / (max - min)) * 100;
  const rightPercent = ((safeRight - min) / (max - min)) * 100;

  const updateLeft = (next) => {
    const nextLeft = Math.min(next, safeRight - step);
    onChange?.([nextLeft, safeRight]);
  };

  const updateRight = (next) => {
    const nextRight = Math.max(next, safeLeft + step);
    onChange?.([safeLeft, nextRight]);
  };

  return (
    <div className="relative w-full pt-3 pb-8">
      <div className="h-1 rounded-full bg-black/10" />
      <div
        className="absolute h-1 rounded-full bg-black top-3"
        style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeLeft}
        onChange={(event) => updateLeft(Number(event.target.value))}
        className="absolute top-1 w-full appearance-none bg-transparent pointer-events-none slider-thumb-left"
        aria-label="Minimum price"
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeRight}
        onChange={(event) => updateRight(Number(event.target.value))}
        className="absolute top-1 w-full appearance-none bg-transparent pointer-events-none slider-thumb-right"
        aria-label="Maximum price"
      />

      <div
        className="absolute top-8 -translate-x-1/2 font-satoshi text-[14px] text-black/80 whitespace-nowrap"
        style={{ left: `${leftPercent}%` }}
      >
        ${safeLeft}
      </div>
      <div
        className="absolute top-8 -translate-x-1/2 font-satoshi text-[14px] text-black/80 whitespace-nowrap"
        style={{ left: `${rightPercent}%` }}
      >
        ${safeRight}
      </div>
    </div>
  );
};

export default Slider;