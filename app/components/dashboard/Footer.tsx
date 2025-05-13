'use client';

import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export const Footer = () => (
  <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 bg-gray-100 dark:bg-gray-900 py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              W
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wellness App</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-400 text-sm">
            Your personal companion for a healthier and happier life.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">About Us</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">Services</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">Contact</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">Blog</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">Guides</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">FAQs</a></li>
            <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-sm">Support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-8 text-center">
        <p className="text-gray-700 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Wellness App. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
); 