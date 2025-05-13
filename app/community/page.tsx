'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ChevronRight } from 'lucide-react';
import { Header } from '@/app/components/dashboard/Header';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Community() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleBookCounseling = () => {
    router.push('/appointment?returnTo=/community');
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      router.push('/');
      toast.success('Successfully signed out!');
    } catch (error) {
      toast.error('Error signing out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 text-gray-900 dark:text-white">
      <Header
        activeTab="community"
        setActiveTab={(tab) => {
          if (tab === 'resources') {
            router.push('/resources');
          } else if (tab === 'community') {
            router.push('/community');
          } else if (tab === 'dashboard') {
            router.push('/dashboard');
          }
        }}
        handleBookCounseling={handleBookCounseling}
        handleSignOut={handleSignOut}
        isLoading={isLoading}
      />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Community!
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect, share, and grow with others on their wellness journey.
          </p>
        </div>

        <Card className="bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
            <CardTitle className="text-2xl">Community Features Coming Soon</CardTitle>
            <CardDescription className="text-teal-800 dark:text-teal-200">
              We're building a supportive space just for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-4">
                Look forward to:
              </p>
              <ul className="mt-4 space-y-3 text-gray-600 dark:text-gray-300 max-w-md mx-auto text-left">
                <li><ChevronRight className="inline-block h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" /> Discussion forums to share experiences</li>
                <li><ChevronRight className="inline-block h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" /> Group activities and challenges</li>
                <li><ChevronRight className="inline-block h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" /> Sharing success stories and getting inspiration</li>
                <li><ChevronRight className="inline-block h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" /> Peer-to-peer support networks</li>
              </ul>
              <Button className="mt-8 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white">
                Notify me when launched!
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 