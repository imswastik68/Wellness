"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ExpertType } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const experts: ExpertType[] = [
  {
    id: 1,
    name: "Dr. Jane Wilson",
    specialty: "Nutritionist",
    bio: "Specializing in plant-based nutrition and gut health, Dr. Wilson helps clients optimize their diet for maximum wellness.",
    image: "https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Michael Chang",
    specialty: "Fitness Coach",
    bio: "With 15 years of experience in functional fitness, Michael designs programs that build strength and prevent injuries.",
    image: "https://images.pexels.com/photos/6456305/pexels-photo-6456305.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Dr. Amara Patel",
    specialty: "Mental Health Specialist",
    bio: "Combining traditional therapy with mindfulness techniques, Dr. Patel helps clients navigate stress and build resilience.",
    image: "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Robert Martinez",
    specialty: "Yoga Instructor",
    bio: "Robert's approach to yoga integrates movement, breath, and meditation for a practice that nurtures body and mind.",
    image: "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Experts() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setVisibleItems((prev) => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".expert-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="experts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Wellness Experts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our team of certified professionals is dedicated to guiding you 
            on your journey to optimal health and wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert) => (
            <Card 
              key={expert.id}
              className={cn(
                "expert-card overflow-hidden transition-all duration-700",
                visibleItems.includes(expert.id) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              data-id={expert.id}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{expert.name}</h3>
                <p className="text-teal-500 dark:text-teal-400 mb-3">{expert.specialty}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{expert.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}