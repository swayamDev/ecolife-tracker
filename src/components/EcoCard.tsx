import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EcoCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "energy" | "success";
  animate?: boolean;
}

const EcoCard = ({ children, className, variant = "default", animate = false }: EcoCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        animate && "animate-float",
        {
          "bg-card shadow-eco border border-border": variant === "default",
          "bg-gradient-eco-primary text-primary-foreground shadow-eco": variant === "gradient",
          "bg-gradient-eco-energy text-white shadow-energy": variant === "energy",
          "bg-gradient-eco-success text-success-foreground shadow-glow-success": variant === "success",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default EcoCard;