import React, { useState } from "react";
import Slider from "./Slider";

const PriceRangeSlider = ({
  min = 0,
  max = 500,
  initialMin = 50,
  initialMax = 200,
  onRangeChange,
}) => {
  const [range, setRange] = useState([initialMin, initialMax]);

  const handleChange = (nextRange) => {
    setRange(nextRange);
    onRangeChange?.(nextRange);
  };

  return (
    <div className="w-full pr-[8%]">
      <Slider min={min} max={max} value={range} onChange={handleChange} />
    </div>
  );
};

export default PriceRangeSlider;