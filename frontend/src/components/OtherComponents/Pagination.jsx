import React, { useMemo } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5"
const buildPageList = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const set = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);
  const sorted = [...set]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const out = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      out.push("ellipsis");
    }
    out.push(sorted[i]);
  }
  return out;
};

const pageButtonClass = (active) =>
  [
    "inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border px-2 font-satoshi text-[14px] transition-colors",
    active
      ? "border-black bg-black text-white"
      : "border-black/10 bg-white text-black hover:border-black/30",
  ].join(" ");

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) => {
  const pages = useMemo(
    () => buildPageList(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (totalPages <= 1) {
    return null;
  }

  const go = (page) => {
    const next = Math.min(Math.max(1, page), totalPages);
    if (next !== currentPage) {
      onPageChange?.(next);
    }
  };

  return (
    <nav
      className={`flex flex-wrap items-center mb-5 lg:mb-10 justify-between gap-2 sm:gap-3 ${className}`}
      aria-label="Pagination" 
    >
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-3 py-2 font-satoshi text-[13px] text-black transition-colors hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-40"
      ><IoMdArrowBack  />
        Previous
      </button>

      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-1 font-satoshi text-[14px] text-black/40"
              aria-hidden
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => go(item)}
              aria-current={item === currentPage ? "page" : undefined}
              className={pageButtonClass(item === currentPage)}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-2 rounded-[10px] border border-black/10 bg-white px-3 py-2 font-satoshi text-[13px] text-black transition-colors hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <IoArrowForward />
      </button>
    </nav>
  );
};

export default Pagination;
