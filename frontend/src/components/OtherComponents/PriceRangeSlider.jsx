import { useState, useRef, useCallback } from "react";
<script src="./assets/vendor/nouislider/dist/nouislider.min.js"></script>
const MIN = 0;
const MAX = 100;
const GAP = 5;

export default function RangeSlider({ start = [25, 75] }) {
  const [low, setLow] = useState(start[0]);
  const [high, setHigh] = useState(start[1]);
  const trackRef = useRef(null);
  const dragging = useRef(null);

  const pct = (v) => ((v - MIN) / (MAX - MIN)) * 100;

  const getVal = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(MIN + ratio * (MAX - MIN));
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const val = getVal(clientX);
    if (dragging.current === "min") setLow(Math.min(val, high - GAP));
    else setHigh(Math.max(val, low + GAP));
  }, [low, high, getVal]);

  const onUp = () => { dragging.current = null; };

  return (
<div class="w-full">
  <label class="sr-only">Example range</label>
  <div data-hs-range-slider='{
    "start": [25, 75],
    "range": {
      "min": 0,
      "max": 100
    },
    "connect": true,
    "tooltips": true,
    "formatter": "integer",
    "cssClasses": {
      "target": "relative h-2 rounded-full bg-surface",
      "base": "size-full relative z-1",
      "origin": "absolute top-0 end-0 size-full origin-[0_0] rounded-full",
      "handle": "absolute top-1/2 end-0 size-4.5 bg-layer border-4 border-primary rounded-full cursor-pointer translate-x-2/4 -translate-y-2/4",
      "connects": "relative z-0 size-full rounded-full overflow-hidden",
      "connect": "absolute top-0 end-0 z-1 size-full origin-[0_0] bg-primary",
      "touchArea": "absolute -inset-1",
      "tooltip": "bg-layer border border-layer-line text-sm text-layer-foreground py-1 px-2 rounded-lg mb-3 absolute bottom-full start-2/4 -translate-x-2/4"
    }
  }'></div>
</div>
  );
}