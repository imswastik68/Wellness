"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Wellness
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your trusted partner for holistic health and wellbeing. We're dedicated to helping you achieve balance in mind, body, and spirit.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Programs", "Team", "Blog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-teal-500 dark:text-gray-300 dark:hover:text-teal-400 transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {["Nutrition Counseling", "Fitness Programs", "Mental Wellness", "Meditation Classes", "Yoga Sessions", "Health Coaching"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-teal-500 dark:text-gray-300 dark:hover:text-teal-400 transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  NIT Rourkela<br />
                  Odisha, IN, 769008
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  (+91) 72055-xxxxx
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">
                  info@wellness.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © 2025 Wellness. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="text-gray-500 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}