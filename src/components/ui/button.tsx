import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-xl text-[15px] font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[17px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#e11d48] from-[30%] via-[#db2777] via-[50%] to-[#c026d3] text-white hover:brightness-110",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/[0.08] bg-white/[0.04] text-white hover:bg-white/[0.08]",
        secondary: "bg-white/[0.04] text-white hover:bg-white/[0.08]",
        ghost: "text-white/72 hover:text-white",
        link: "text-rose-400 underline-offset-4 hover:underline",
        hero: "bg-gradient-to-r from-[#e11d48] from-[30%] via-[#db2777] via-[50%] to-[#c026d3] text-white hover:brightness-110",
        glass: "bg-white/[0.04] text-white hover:bg-white/[0.08]",
      },
      // The mockup carries one page button (h44) and one compact variant (h38); `lg`/`xl`
      // stay as aliases of the page button so existing call sites land on it unchanged.
      size: {
        default: "h-11 px-[26px]",
        sm: "h-[38px] px-[18px] text-sm [&_svg]:size-4",
        lg: "h-11 px-[26px]",
        xl: "h-11 px-[26px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
