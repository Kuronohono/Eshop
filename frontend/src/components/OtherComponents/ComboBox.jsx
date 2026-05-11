import React, { useMemo } from "react";

const defaultOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const ComboBox = ({
  options = defaultOptions,
  value,
  onChange,
  className = "",
}) => {
  const safeOptions = useMemo(
    () => (Array.isArray(options) && options.length > 0 ? options : defaultOptions),
    [options]
  );

  return (
    <select 
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      className={`font-satoshi text-[14px] lg:text-[16px] leading-none h-5 bg-transparent text-black cursor-pointer outline-none align-middle ${className}`}
      aria-label="Sort products"
    >
      {safeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;