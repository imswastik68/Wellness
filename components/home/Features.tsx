"use client";

import { ServiceType } from "@/types";
import {
  Heart,
  Brain,
  Salad,
  Dumbbell,
  Sun,
  Utensils,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services: ServiceType[] = [
  {
    id: 1,
    title: "Mind & Soul",
    description: "Meditation, stress management, and mental wellness practices to cultivate inner peace.",
    icon: "Brain",
  },
  {
    id: 2,
    title: "Nutrition",
    description: "Personalized meal plans and nutritional guidance for optimal health and energy.",
    icon: "Utensils",
  },
  {
    id: 3,
    title: "Fitness",
    description: "Tailored exercise programs designed to suit your lifestyle and fitness goals.",
    icon: "Dumbbell",
  },
  {
    id: 4,
    title: "Holistic Care",
    description: "Integrative approaches combining traditional and modern wellness techniques.",
    icon: "Heart",
  },
  {
    id: 5,
    title: "Healthy Diet",
    description: "Clean eating plans focusing on whole foods to nourish your body from within.",
    icon: "Salad",
  },
  {
    id: 6,
    title: "Lifestyle Balance",
    description: "Strategies for work-life harmony and creating sustainable healthy habits.",
    icon: "Sun",
  },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Brain":
      return <Brain className="h-12 w-12 text-teal-500" />;
    case "Utensils":
      return <Utensils className="h-12 w-12 text-teal-500" />;
    case "Dumbbell":
      return <Dumbbell className="h-12 w-12 text-teal-500" />;
    case "Heart":
      return <Heart className="h-12 w-12 text-teal-500" />;
    case "Salad":
      return <Salad className="h-12 w-12 text-teal-500" />;
    case "Sun":
      return <Sun className="h-12 w-12 text-teal-500" />;
    default:
      return <Heart className="h-12 w-12 text-teal-500" />;
  }
};

export default function Features() {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Holistic Wellness Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover comprehensive programs designed to enhance your physical,
            mental, and emotional wellbeing through our expert-led services.
          </p>
          <div className="mt-8">
            <Link href="/appointment">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                <Calendar className="mr-2 h-5 w-5" />
                Book an Appointment
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              {/* Softer gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:via-teal-500/5 group-hover:to-teal-500/5 transition-all duration-300" />

              {/* Subtle animated border */}
              <div className="absolute inset-0 border border-transparent group-hover:border-teal-500/20 rounded-lg transition-all duration-300" />

              <CardHeader className="pb-3 relative flex flex-col items-start">
                {/* Reduced scale and rotation for icon */}
                <div className="mb-3 transition-all duration-300 group-hover:scale-105 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  {getIconComponent(service.icon)}
                </div>
                <CardTitle className="text-xl transition-all duration-300 group-hover:text-teal-500 dark:group-hover:text-teal-400">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/appointment">
                  <Button
                    variant="ghost"
                    className="p-0 text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300 transition-all duration-300"
                  >
                    Book now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}