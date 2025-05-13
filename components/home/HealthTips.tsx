"use client";

import { BlogPostType } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: "The Science Behind Mindful Eating",
    excerpt: "Discover how paying attention to your meals can transform your relationship with food and improve digestion.",
    date: "April 15, 2025",
    category: "Nutrition",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Morning Routines for Mental Clarity",
    excerpt: "Simple practices to incorporate into your morning that set the tone for a focused, productive day.",
    date: "April 12, 2025",
    category: "Mental Health",
    image: "https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Low-Impact Exercises for Joint Health",
    excerpt: "Effective workouts that build strength and flexibility without putting stress on your joints.",
    date: "April 8, 2025",
    category: "Fitness",
    image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function HealthTips() {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Health Tips</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Stay informed with our latest articles on health, wellness, and balanced living.
            </p>
          </div>
          <Button variant="outline" size="lg" className="self-start">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-medium py-1 px-2 rounded">
                  {post.category}
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <Link href="#">
                  <Button variant="ghost" className="p-0 text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
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