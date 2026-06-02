import React, { useMemo } from "react";
import CardComponent from "../CardComponent/CardComponent";

const fallbackItems = [
  { id: "fallback-1", title: "Slide 1", price: 120, rating: 4.5, sale_per: 0 },
  { id: "fallback-2", title: "Slide 2", price: 140, rating: 4.2, sale_per: 0 },
  { id: "fallback-3", title: "Slide 3", price: 160, rating: 4.8, sale_per: 0 },
];

const Carousel = ({ items = fallbackItems, crumbs }) => {
  const safeItems = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return fallbackItems;
    return items;
  }, [items]);

  return (
    <div className="w-full max-w-7xl mx-auto min-w-0">
      <div
        className="carousel-track flex flex-nowrap gap-4 overflow-x-scroll overscroll-x-contain snap-x snap-mandatory pt-3 pb-3 pl-3 pr-2 touch-pan-x cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {safeItems.map((item) => (
          <div
            key={item.id}
          className="snap-start shrink-0 grow-0 w-[75%] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <CardComponent product={item} crumbs={crumbs}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;