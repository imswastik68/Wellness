"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-100/30 rounded-bl-full dark:bg-teal-900/10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-100/40 rounded-tr-full dark:bg-blue-900/10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div 
            className={`transition-all duration-1000 delay-300 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-800 font-medium text-sm mb-6 dark:bg-teal-900/30 dark:text-teal-300">
              Your Journey To Wellness Starts Here
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover a{" "}
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                healthier
              </span>{" "}
              version of yourself
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Our holistic approach to health and wellness helps you achieve balance in mind, body, and spirit. Join our community and transform your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          <div 
            className={`relative transition-all duration-1000 delay-500 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:ml-auto rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg"
                alt="Woman practicing yoga in a peaceful environment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 lg:-left-8 lg:bottom-8 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg max-w-xs">
              <p className="font-medium mb-1">Over 10,000+ happy clients</p>
              <div className="flex">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-gray-800"
                    ></div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-7.07 3.714 1.35-7.867L.36 7.13l7.869-1.142L10 0l2.771 5.988 7.869 1.142-5.92 5.302 1.35 7.867z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">4.9 (2.5k+ reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}