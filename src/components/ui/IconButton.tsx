import { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export default function IconButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(className)} {...props}>
      {children}
    </button>
  );
}
