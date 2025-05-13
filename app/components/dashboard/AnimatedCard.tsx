import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardVisual } from "./CardVisual";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  IconComponent: LucideIcon;
  bgColorClass: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onClick?: () => void;
  borderColor?: string;
}

export const AnimatedCard = ({
  IconComponent,
  bgColorClass,
  title,
  description,
  children,
  onClick,
  borderColor
}: AnimatedCardProps) => {
  return (
    <div className="group relative h-[400px]">
      {/* Animated border gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
      
      {/* Card content */}
      <Card 
        className={cn(
          "relative hover:shadow-xl transition-shadow duration-200 ease-in-out cursor-pointer bg-white dark:bg-gray-900 h-full flex flex-col",
          borderColor
        )}
        onClick={onClick}
      >
        <CardHeader className="flex-none">
          <CardVisual IconComponent={IconComponent} bgColorClass={bgColorClass} />
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <IconComponent className={`h-5 w-5 ${bgColorClass.replace('bg-', 'text-')}`} />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}; 