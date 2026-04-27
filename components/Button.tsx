"use client";

import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        "button-general": "bg-brand-primary text-white hover:bg-[#00B8DE] hover:shadow-lg active:bg-[#009BB9]",
        "button-ghost": "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 active:bg-brand-primary/20",
      },
      size: {
        default: "w-auto min-w-[160px] h-[44px] px-[24px] py-[12px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        full: "w-full h-[44px]",
      },
    },
    defaultVariants: {
      variant: "button-general",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <>
            {icon && (
              <span className="inline-flex shrink-0" style={{ marginRight: children ? "25px" : "0px" }}>
                {icon}
              </span>
            )}
            <span>{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
