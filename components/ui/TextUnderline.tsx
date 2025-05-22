import { ElementType, ComponentPropsWithoutRef } from "react";

type TextUnderlineProps<T extends ElementType> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function TextUnderline<T extends ElementType = "span">({
  as,
  children,
  className = "",
  ...props
}: TextUnderlineProps<T>) {
  const Component = as || "span";

  return (
    <Component
      className={`relative before:content-[''] before:h-[2px] before:bg-text-dark before:absolute before:-bottom-1 before:left-0 before:transition-all before:duration-300 before:ease-in-out before:w-0 hover:before:w-full ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
