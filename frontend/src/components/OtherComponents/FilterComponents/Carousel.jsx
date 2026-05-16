import React, { useMemo } from "react";
import CardComponent from "../CardComponent/CardComponent";

const fallbackItems = [
  { id: "fallback-1", title: "Slide 1", price: 120, rating: 4.5, sale_per: 0 },
  { id: "fallback-2", title: "Slide 2", price: 140, rating: 4.2, sale_per: 0 },
  { id: "fallback-3", title: "Slide 3", price: 160, rating: 4.8, sale_per: 0 },
];

const Carousel = ({ items = fallbackItems }) => {
  const safeItems = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return fallbackItems;
    return items;
  }, [items]);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div
        className="flex flex-nowrap gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory pt-3 pb-3 pl-3 pr-2 touch-pan-x"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {safeItems.map((item) => (
          <div
            key={item.id}
            className="snap-start shrink-0 min-w-[75%] sm:min-w-[calc(50%_-_0.5rem)] md:min-w-[calc(33.333%_-_0.67rem)] lg:min-w-[calc(25%_-_0.75rem)]"
          >
            <CardComponent product={item}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;