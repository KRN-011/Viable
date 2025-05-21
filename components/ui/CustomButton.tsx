"use client";

import { motion, HTMLMotionProps } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<"button">, "children" | "className">;

export default function CustomButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className={`relative overflow-hidden bg-background-primary py-2 px-4 rounded-lg font-semibold w-full text-white  transition-all duration-300 hover:cursor-pointer group hover:ring-1 hover:ring-text-primary hover:ring-offset-2 ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-text-primary/40 to-transparent" />
    </motion.button>
  );
}
