"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [hidden, setHidden] = React.useState(true);
  const [hovering, setHovering] = React.useState(false);
  const [clicking, setClicking] = React.useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 350, damping: 28, mass: 0.5 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const move = (e: MouseEvent) => {
      setHidden(false);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );
      setHovering(!!interactive);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.body.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: hidden ? 0 : 1,
          scale: clicking ? 0.5 : hovering ? 0 : 1,
        }}
      />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          opacity: hidden ? 0 : 1,
          scale: clicking ? 0.85 : hovering ? 1.6 : 1,
        }}
      />
    </>
  );
}
