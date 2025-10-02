import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

interface EcoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "energy" | "success" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  showLeaf?: boolean;
}

const EcoButton = forwardRef<HTMLButtonElement, EcoButtonProps>(
  ({ className, variant = "primary", size = "default", showLeaf = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300",
          "hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          {
            "bg-gradient-eco-primary text-primary-foreground shadow-eco hover:shadow-xl": variant === "primary",
            "bg-gradient-eco-energy text-white shadow-energy hover:shadow-xl": variant === "energy",
            "bg-gradient-eco-success text-success-foreground shadow-glow-success hover:shadow-xl": variant === "success",
            "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground": variant === "outline",
            "text-primary hover:bg-accent": variant === "ghost",
          },
          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-6 text-base": size === "default",
            "h-12 px-8 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {showLeaf && <Leaf className="h-4 w-4" />}
        {children}
      </button>
    );
  }
);

EcoButton.displayName = "EcoButton";

export default EcoButton;