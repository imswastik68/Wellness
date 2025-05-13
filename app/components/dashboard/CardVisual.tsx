import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CardVisualProps {
  IconComponent: LucideIcon;
  bgColorClass: string;
}

export const CardVisual = ({ IconComponent, bgColorClass }: CardVisualProps) => {
  // Convert bgColorClass to gradient
  const gradientClass = bgColorClass.replace('bg-', 'bg-gradient-to-br from-').replace('to-', 'to-');
  
  return (
    <div className={cn(
      "flex items-center justify-center h-16 w-16 rounded-full mb-4",
      "relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-white/20 before:rounded-full",
      "after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/30 after:to-transparent after:rounded-full",
      gradientClass
    )}>
      <IconComponent className="h-8 w-8 text-white relative z-10 drop-shadow-lg" />
    </div>
  );
}; 