"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedSection({ children, className = "", direction = "up", ...props }) {
  const ref = useRef(null);
  // Track inView continuously for fade out
  const inView = useInView(ref, { once: false, margin: "-100px" });
  let initial, animate;
  if (direction === "left") {
    initial = { opacity: 0, x: -80 };
    animate = inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 };
  } else if (direction === "right") {
    initial = { opacity: 0, x: 80 };
    animate = inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 };
  } else if (direction === "center") {
    initial = { opacity: 0, x: (props['data-side'] === 'left' ? -80 : 80) };
    animate = inView ? { opacity: 1, x: 0 } : { opacity: 0, x: (props['data-side'] === 'left' ? -80 : 80) };
  } else {
    initial = { opacity: 0, y: 40 };
    animate = inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 };
  }
  return (
    <motion.section
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
      style={{ height: '100%' }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
