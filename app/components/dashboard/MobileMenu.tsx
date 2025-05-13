'use client';

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon, LogOut, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MobileMenuProps {
  handleBookCounseling: () => void;
  handleSignOut: () => void;
  isLoading: boolean;
}

export function MobileMenu({ handleBookCounseling, handleSignOut, isLoading }: MobileMenuProps) {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Open menu"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          <Button
            variant="ghost"
            className="justify-start text-lg"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-lg"
            onClick={() => router.push('/resources')}
          >
            Resources
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-lg"
            onClick={() => router.push('/community')}
          >
            Community
          </Button>
          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
          <Button
            variant="outline"
            className="justify-start text-lg"
            onClick={handleBookCounseling}
            disabled={isLoading}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Counseling
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            onClick={handleSignOut}
            disabled={isLoading}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
} 