import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        solid:
          "bg-accent text-accent-fg shadow-[0_1px_0_rgb(255_250_244/0.18)_inset,0_8px_20px_-12px_rgb(110_56_68/0.8)] hover:opacity-90",
        outline:
          "bg-elevated/70 text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_14%,transparent)] hover:bg-elevated",
        ghost: "bg-transparent text-accent hover:bg-accent/8",
        quiet: "bg-bg text-fg hover:bg-border/80",
      },
      size: {
        md: "h-12 rounded-[14px] px-5 text-[15px]",
        sm: "h-10 rounded-[12px] px-3.5 text-[13px]",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    staticScale?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  staticScale,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size }),
        staticScale && "active:scale-100",
        className,
      )}
      {...props}
    />
  );
}
