'use client';

import { Button } from "@/components/ui/button";
import { MenuIcon, LogOut, Calendar } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { MobileMenu } from './MobileMenu';
import Link from 'next/link';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleBookCounseling: () => void;
  handleSignOut: () => void;
  isLoading: boolean;
}

export function Header({ 
  activeTab, 
  setActiveTab, 
  handleBookCounseling, 
  handleSignOut,
  isLoading 
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <Link href="/dashboard" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Wellness
            </span>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400",
                  isActive('/dashboard') && "text-teal-500 dark:text-teal-400"
                )}
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400",
                  isActive('/resources') && "text-teal-500 dark:text-teal-400"
                )}
                onClick={() => router.push('/resources')}
              >
                Resources
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400",
                  isActive('/community') && "text-teal-500 dark:text-teal-400"
                )}
                onClick={() => router.push('/community')}
              >
                Community
              </Button>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 text-teal-500 dark:text-teal-400 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20"
              onClick={handleBookCounseling}
              disabled={isLoading}
            >
              <Calendar className="h-4 w-4" />
              Book Counseling
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
              onClick={handleSignOut}
              disabled={isLoading}
            >
              <LogOut className="h-4 w-4" />
              <span className="ml-2">Sign Out</span>
            </Button>
            {/* Mobile Menu */}
            <MobileMenu
              handleBookCounseling={handleBookCounseling}
              handleSignOut={handleSignOut}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </header>
  );
} 