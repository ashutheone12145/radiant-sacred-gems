import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayNightToggleProps {
  isNightMode: boolean;
  onToggle: () => void;
  size?: "sm" | "default" | "lg";
}

export const DayNightToggle = ({
  isNightMode,
  onToggle,
  size = "default",
}: DayNightToggleProps) => {
  return (
    <Button
      onClick={onToggle}
      variant="outline"
      size={size}
      className={`gap-2 transition-all duration-300 ${
        isNightMode
          ? "bg-navy/80 border-primary/50 text-primary hover:bg-navy"
          : "bg-white/80 border-border hover:bg-white"
      }`}
    >
      {isNightMode ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="hidden sm:inline">Day Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="hidden sm:inline">Night Mode</span>
        </>
      )}
    </Button>
  );
};
