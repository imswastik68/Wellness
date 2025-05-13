'use client';

import { useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  TrendingUp,
  BookOpen,
  Music,
  Dumbbell,
  Bot,
  Brain,
  PenTool,
  Book,
  Smile,
  Sparkles,
  Timer,
  Play,
  Pause,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Heart as HeartIcon,
  Circle,
  Users,
  Menu as MenuIcon
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useToast } from '@/components/ui/use-toast';

// Import components
import { Header } from '@/app/components/dashboard/Header';
import { Footer } from '@/app/components/dashboard/Footer';
import { ChatInterface } from '@/app/components/dashboard/ChatInterface';
import { CardVisual } from '@/app/components/dashboard/CardVisual';
import { AnimatedCard } from '@/app/components/dashboard/AnimatedCard';
import { QuotesCarousel } from '@/app/components/dashboard/QuotesCarousel';

interface Mood {
  value: number;
  label: string;
  color: string;
  emoji: string;
}

const MOODS: Mood[] = [
  { value: 5, label: 'Excellent', color: '#4CAF50', emoji: '😁' },
  { value: 4, label: 'Good', color: '#8BC34A', emoji: '😊' },
  { value: 3, label: 'Okay', color: '#FFC107', emoji: '😐' },
  { value: 2, label: 'Not great', color: '#FF9800', emoji: '😔' },
  { value: 1, label: 'Bad', color: '#F44336', emoji: '😢' }
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! I'm your wellness assistant. How can I help you today?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRunning(false);
      // Optional: Add a notification or sound when timer finishes
      toast({
        title: "Focus session complete!",
        description: "Great job staying focused!",
      });
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimerStart = () => {
    setIsRunning(true);
  };

  const handleTimerPause = () => {
    setIsRunning(false);
  };

  const handleTimerReset = () => {
    setIsRunning(false);
    setTimer(25 * 60); // Reset to initial time
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      router.push('/');
      toast({
        title: "Successfully signed out!",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookCounseling = () => {
    router.push('/appointment?returnTo=/dashboard');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = { text: newMessage, isUser: true };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response (replace with actual AI integration later)
    // A more advanced bot would process the user message and respond accordingly.
    setTimeout(() => {
      const botResponse = {
        text: "Thanks for sharing! I'm still learning, but I can help you with basic wellness questions or connect you with resources.",
        isUser: false
      }; // Placeholder response
      setMessages(prev => [...prev, botResponse]);
    }, 1000); // Simulate bot typing delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 text-gray-900 dark:text-white">
      <Header 
        activeTab="dashboard"
        setActiveTab={(tab) => {
          if (tab === 'resources') {
            router.push('/resources');
          } else if (tab === 'community') {
            router.push('/community');
          }
        }}
        handleBookCounseling={handleBookCounseling}
        handleSignOut={handleSignOut}
        isLoading={isLoading}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, User!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Track your wellness journey and discover new ways to improve your health.
          </p>
        </div>

        {/* Main Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Body Metrics Card */}
          <AnimatedCard
            IconComponent={Activity}
            bgColorClass="bg-gradient-to-br from-teal-500 to-teal-600"
            title="Body Metrics"
            description="Track your physical health indicators"
            onClick={() => router.push('/body-metrics')}
            borderColor="border-teal-500/30"
          >
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Steps</span>
                <span className="font-semibold">8,547/10,000</span>
              </div>
              <Progress value={85} className="h-2 bg-gray-200 dark:bg-gray-700 text-teal-500 dark:text-teal-400" />
              <div className="flex justify-between items-center">
                <span>Water Intake</span>
                <span className="font-semibold">1.5L/2L</span>
              </div>
              <Progress value={75} className="h-2 bg-gray-200 dark:bg-gray-700 text-blue-500 dark:text-blue-400" />
              <div className="flex justify-between items-center">
                <span>Sleep Hours</span>
                <span className="font-semibold">7.5h/8h</span>
              </div>
              <Progress value={94} className="h-2 bg-gray-200 dark:bg-gray-700 text-indigo-500 dark:text-indigo-400" />
            </div>
          </AnimatedCard>

          {/* Mood Tracker Card */}
          <AnimatedCard
            IconComponent={Smile}
            bgColorClass="bg-gradient-to-br from-pink-500 to-rose-500"
            title="Mood Tracker"
            description="Track your daily mood and emotional patterns"
            onClick={() => router.push('/mood-tracker')}
            borderColor="border-pink-500/30"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood.value}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "Mood Updated",
                        description: `You're feeling ${mood.label.toLowerCase()} today!`,
                      });
                    }}
                  >
                    <span className="text-2xl">{mood.emoji}</span>
                  </button>
                ))}
              </div>
              <div className="w-full p-4 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-lg border border-pink-300/30">
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">View Mood Trends</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Meditation & Breathing Card */}
          <AnimatedCard
            IconComponent={Brain}
            bgColorClass="bg-gradient-to-br from-blue-500 to-blue-600"
            title="Mindfulness & Calm"
            description="Guided exercises for relaxation"
            onClick={() => router.push('/mindfulness')}
            borderColor="border-blue-500/30"
          >
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="font-semibold mb-1 text-sm text-blue-800 dark:text-blue-200">Breathing Exercise</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  Try the 4-7-8 technique to calm your nervous system.
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm py-1">Start Exercise</Button>
              </div>
              <Button variant="outline" className="w-full text-sm py-1">
                <Music className="h-4 w-4 mr-2" />
                Guided Meditation
              </Button>
            </div>
          </AnimatedCard>

          {/* CBT Card */}
          <AnimatedCard
            IconComponent={Sparkles}
            bgColorClass="bg-gradient-to-br from-purple-500 to-purple-600"
            title="CBT Tools"
            description="Challenge negative thought patterns"
            onClick={() => toast({
              title: "Coming Soon",
              description: "CBT tools are under development!",
            })}
            borderColor="border-purple-500/30"
          >
            <div className="space-y-2">
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                <h3 className="font-semibold mb-1 text-sm text-purple-800 dark:text-purple-200">Thought Journal</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  Identify and reframe unhelpful thoughts.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white text-sm py-1">Start Journaling</Button>
              </div>
              <Button variant="outline" className="w-full text-sm py-1">
                <Book className="h-4 w-4 mr-2" />
                Worksheets & Guides
              </Button>
            </div>
          </AnimatedCard>

          {/* Personal Journal Card */}
          <AnimatedCard
            IconComponent={PenTool}
            bgColorClass="bg-gradient-to-br from-green-500 to-green-600"
            title="Personal Journal"
            description="Reflect on your day and feelings"
            onClick={() => router.push('/journal')}
            borderColor="border-green-500/30"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Start a new entry to capture your thoughts.
              </p>
              <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white">New Entry</Button>
              <Button variant="outline" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                View Past Entries
              </Button>
            </div>
          </AnimatedCard>

          {/* Music Card */}
          <AnimatedCard
            IconComponent={Music}
            bgColorClass="bg-gradient-to-br from-indigo-500 to-purple-600"
            title="Music & Sound"
            description="Curated playlists for focus, relaxation, and sleep"
            onClick={() => router.push('/music')}
            borderColor="border-indigo-500/30"
          >
            <div className="space-y-4">
              <Button className="w-full">
                <Music className="h-4 w-4 mr-2" />
                Focus & Study
              </Button>
              <Button variant="outline" className="w-full">
                <Music className="h-4 w-4 mr-2" />
                Relaxation
              </Button>
              <Button variant="outline" className="w-full">
                <Music className="h-4 w-4 mr-2" />
                Sleep Aid
              </Button>
            </div>
          </AnimatedCard>

          {/* Exercises Card */}
          <AnimatedCard
            IconComponent={Dumbbell}
            bgColorClass="bg-gradient-to-br from-orange-500 to-orange-600"
            title="Physical Activity"
            description="Move your body for better health"
            onClick={() => toast({
              title: "Coming Soon",
              description: "Exercise guides are under development!",
            })}
            borderColor="border-orange-500/30"
          >
            <div className="space-y-4">
              <Button className="w-full">
                <Activity className="h-4 w-4 mr-2" />
                Quick Workout
              </Button>
              <Button variant="outline" className="w-full">
                <Dumbbell className="h-4 w-4 mr-2" />
                Strength Training
              </Button>
              <Button variant="outline" className="w-full">
                <Activity className="h-4 w-4 mr-2" />
                Stretching
              </Button>
            </div>
          </AnimatedCard>

          {/* Focus Timer Card */}
          <AnimatedCard
            IconComponent={Timer}
            bgColorClass="bg-gradient-to-br from-red-500 to-red-600"
            title="Focus Timer (25min)"
            description="Use Pomodoro technique for focus"
            borderColor="border-red-500/30"
          >
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">{formatTime(timer)}</div>
                <div className="flex justify-center gap-3">
                  {!isRunning ? (
                    <Button onClick={handleTimerStart} className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button onClick={handleTimerPause} className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleTimerReset} className="text-gray-700 dark:text-gray-200">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              <Progress value={(timer / (25 * 60)) * 100} className="h-2 bg-gray-200 dark:bg-gray-700 text-red-500 dark:text-red-400" />
            </div>
          </AnimatedCard>
        </div>

        {/* Quotes Section */}
        <div className="mt-12">
          <QuotesCarousel showHeader={false} />
        </div>
      </main>

      {/* Chat Interface */}
      <ChatInterface 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />

      <Footer />
    </div>
  );
}