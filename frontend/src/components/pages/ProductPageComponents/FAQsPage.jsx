import React, { useState } from "react";

const defaultFaqs = [
  {
    q: "How do I choose the right size?",
    a: "Use the size selector on the product page. If you're between sizes, we recommend choosing the larger size for a more comfortable fit.",
  },
  {
    q: "When will my order ship and how long does delivery take?",
    a: "Orders are typically processed within 1–2 business days. Delivery time depends on your location and shipping method, usually 2–7 business days after dispatch.",
  },
  {
    q: "Can I return or exchange this item?",
    a: "Yes. Items can be returned or exchanged within 14 days of delivery as long as they're unworn, unwashed, and in original condition.",
  },
  {
    q: "What materials is this item made from?",
    a: "Material details can be found in the product description. We provide fabric composition information to help you choose the right item for your needs.",
  },
  {
    q: "How should I wash and care for this garment?",
    a: "Please follow the care instructions on the product label. Most items can be machine washed on a gentle cycle, but some fabrics may require special care.",
  },
  {
    q: "Will this item shrink after washing?",
    a: "Our garments are designed to minimize shrinkage when washed according to the care instructions. We recommend avoiding high heat when drying.",
  },
  {
    q: "What if the item doesn't fit me?",
    a: "If the fit isn't right, you can return or exchange the item within our return window, provided it meets our return conditions.",
  },
  {
    q: "Are the product photos accurate?",
    a: "We strive to display colors and details as accurately as possible. However, slight variations may occur due to screen settings and lighting.",
  },
  {
    q: "Is this item suitable for all seasons?",
    a: "The product description includes fabric weight and style details to help determine whether it's best suited for warm, cool, or year-round wear.",
  },
  {
    q: "Are your products ethically made?",
    a: "We work with trusted manufacturing partners and continuously strive to maintain responsible sourcing and production standards.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Free shipping may be available for orders above a certain value. Any applicable shipping promotions will be shown at checkout.",
  },
  {
    q: "Can I exchange for a different size or color?",
    a: "Yes, exchanges are available subject to stock availability and our exchange policy.",
  },
  {
    q: "What should I do if I receive a damaged or incorrect item?",
    a: "Please contact our support team within 48 hours of delivery and include photos of the issue so we can assist you quickly.",
  }
];

const FAQsPage = ({ product }) => {
  const [openIndexes, setOpenIndexes] = useState(new Set([0]))

  const toggle = (idx) => {
    setOpenIndexes(prev => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="flex flex-col gap-3">
        {defaultFaqs.map((item, idx) => {
          const isOpen = openIndexes.has(idx)
          return (
            <div
              key={`${product?.id ?? "product"}-faq-${idx}`}
              className="border border-black/10 rounded-[16px] px-4 py-4"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span className="font-satoshibold text-[16px] md:text-[18px]">
                  {item.q}
                </span>
                <span className="font-satoshi text-black/60 text-xl select-none transition-transform duration-500 ease-in-out"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: isOpen ? "200px" : "0px", opacity: isOpen ? 1 : 0 }}
              >
                <p className="font-satoshi text-[14px] md:text-[16px] text-black/70 mt-3">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQsPage;