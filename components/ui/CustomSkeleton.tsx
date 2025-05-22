import { cn } from "@/lib/utils";

type CustomSkeletonProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function CustomSkeleton({
  children,
  className,
}: CustomSkeletonProps) {
  if (!children) {
    return (
      <div
        className={cn("w-full h-full bg-gray-200 animate-pulse", className)}
      />
    );
  }

  return (
    <div className={cn("w-full h-full bg-gray-200 animate-pulse", className)}>
      {children}
    </div>
  );
}
