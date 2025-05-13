'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Play } from 'lucide-react';
import { toast } from 'sonner';
import { Header } from '@/app/components/dashboard/Header';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

export default function Resources() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleBookCounseling = () => {
    router.push('/appointment?returnTo=/resources');
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
        activeTab="resources"
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Educational Resources
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Learn more about wellness and healthy living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Articles & Guides</CardTitle>
              <CardDescription>Expert-written content on wellness topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer" onClick={() => toast.info('Viewing article...')}>
                  <Book className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">5 Ways to Improve Sleep Hygiene</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Discover simple habits for better sleep quality.</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer" onClick={() => toast.info('Viewing guide...')}>
                  <Book className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Beginner's Guide to Meditation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Start your mindfulness practice today with this easy guide.</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">View All Articles</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Video Resources</CardTitle>
              <CardDescription>Visual guides and tutorials for wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer" onClick={() => toast.info('Watching video...')}>
                  <Play className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">10-Minute Yoga Flow for Beginners</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Gentle movements to start your day.</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-start gap-4 hover:shadow-sm transition-shadow cursor-pointer" onClick={() => toast.info('Watching video...')}>
                  <Play className="h-6 w-6 text-teal-600 dark:text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Guided Breathing for Stress Relief</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">A short video to help you relax.</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">View All Videos</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 