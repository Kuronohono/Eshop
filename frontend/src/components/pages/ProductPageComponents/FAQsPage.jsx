import React, { useState } from "react";

const defaultFaqs = [
  {
    q: "How do I choose the right size?",
    a: "Use the size selector on the product page. If you’re between sizes, we recommend choosing the larger size for a more comfortable fit.",
  },
  {
    q: "When will my order ship and how long does delivery take?",
    a: "Orders are typically processed within 1–2 business days. Delivery time depends on your location and shipping method, usually 2–7 business days after dispatch.",
  },
  {
    q: "Can I return or exchange this item?",
    a: "Yes. Items can be returned or exchanged within 14 days of delivery as long as they’re unworn, unwashed, and in original condition.",
  },
];

const FAQsPage = ({ product }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="flex flex-col gap-3">
        {defaultFaqs.map((item, idx) => {
          const isOpen = idx === openIndex;
          return (
            <div
              key={`${product?.id ?? "product"}-faq-${idx}`}
              className="border border-black/10 rounded-[16px] px-4 py-4"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between gap-3 text-left"
                onClick={() => setOpenIndex((prev) => (prev === idx ? -1 : idx))}
                aria-expanded={isOpen}
              >
                <span className="font-satoshibold text-[16px] md:text-[18px]">
                  {item.q}
                </span>
                <span className="font-satoshi text-black/60">
                  {isOpen ? "–" : "+"}
                </span>
              </button>
              {isOpen && (
                <p className="font-satoshi text-[14px] md:text-[16px] text-black/70 mt-3">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQsPage;