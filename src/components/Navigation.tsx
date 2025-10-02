import { Link, useLocation } from "react-router-dom";
import { Home, Plus, BarChart3, Award, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/log", icon: Plus, label: "Log Action" },
    { path: "/progress", icon: BarChart3, label: "Progress" },
    { path: "/badges", icon: Award, label: "Badges" },
    { path: "/about", icon: Leaf, label: "About" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-border backdrop-blur-sm bg-card/80 md:top-0 md:bottom-auto md:bg-gradient-eco-primary md:border-t-0 md:border-b z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-8 py-3 md:py-4">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all duration-300",
                  "hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px] justify-center",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-primary md:text-primary-foreground bg-accent md:bg-white/20 shadow-md"
                    : "text-muted-foreground md:text-primary-foreground/70 hover:text-primary md:hover:text-primary-foreground hover:bg-accent/50 md:hover:bg-white/10"
                )}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="text-xs md:text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
