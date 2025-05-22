"use client";

export default function LoadingSpinner({
  size = 32,
  absolute = true,
  className,
}: {
  size?: number;
  absolute?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${absolute ? "absolute top-0 left-0 w-full h-full flex justify-center items-center" : ""}`}
    >
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-b-2 border-gray-900 ${className}`}
      ></div>
    </div>
  );
}
