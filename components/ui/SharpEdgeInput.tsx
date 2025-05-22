"use client";

import { motion, HTMLMotionProps } from "framer-motion";

type InputProps = HTMLMotionProps<"input">;

export default function SharpEdgeInput({ className, ...props }: InputProps) {
  return (
    <motion.input
      className={`relative py-2 px-4 bg-white border border-background-dark text-text-dark text-lg  
            hover:cursor-pointer transition-all duration-300 ease-in-out w-full focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-background-dark focus:border-transparent ${className}`}
      {...props}
    />
  );
}
