"use client";

import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"button">, "children">;

export default function SharpEdgeButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className={`relative w-full ${className}`}
      {...props}
    >
      <div className="relative py-2 px-4 bg-background-light border border-background-dark text-text-dark text-lg font-bold hover:cursor-pointer transition-all duration-300 ease-in-out w-full hover:bg-background-dark hover:text-text-light before:content-[''] hover:rounded-lg before:absolute before:bg-text-dark before:z-[-1] before:w-full before:h-full before:inset-2 before:transition-all before:hover:rounded-lg hover:before:inset-0 before:duration-300 before:ease-in-out">
        <span className="inline-block">{children}</span>
      </div>
    </motion.button>
  );
}
