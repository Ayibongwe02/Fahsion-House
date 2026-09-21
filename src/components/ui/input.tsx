import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-[14px] bg-bg px-4 text-[16px] text-fg placeholder:text-subtle shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-fg)_10%,transparent)] outline-none transition-[box-shadow] duration-150 ease-out focus:shadow-[inset_0_0_0_2px_var(--color-accent)]",
        className,
      )}
      {...props}
    />
  );
}
