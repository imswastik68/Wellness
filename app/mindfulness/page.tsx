'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Music, Play, Pause, BarChart2, CheckCircle, Info, ChevronRight, ArrowRight, TrendingUp, Sun, Moon, ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Type definitions
interface Exercise {
  id: number;
  title: string;
  duration: string;
  description?: string;
  image?: string;
  videoUrl?: string;
}

interface MusicTrack {
  id: number;
  title: string;
  duration: string;
  artist: string;
  audioUrl: string;
}

// Add new interface for daily schedule
interface DailySchedule {
  day: string;
  time: string;
  duration: number;
}

// Dummy data for meditation sessions
const meditationData = [
  { day: 'Mon', minutes: 15, streak: true },
  { day: 'Tue', minutes: 20, streak: true },
  { day: 'Wed', minutes: 5, streak: true },
  { day: 'Thu', minutes: 25, streak: true },
  { day: 'Fri', minutes: 10, streak: true },
  { day: 'Sat', minutes: 15, streak: true },
  { day: 'Sun', minutes: 30, streak: true },
];

// Guided meditation content
const guidedMeditations: Exercise[] = [
  { 
    id: 1, 
    title: "Beginner's Meditation", 
    duration: "5 min", 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60", 
    description: "Perfect for those new to meditation. Learn the basics of mindfulness breathing." 
  },
  { 
    id: 2, 
    title: "Deep Relaxation", 
    duration: "10 min", 
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60", 
    description: "Release tension and find peace with this guided relaxation session." 
  },
  { 
    id: 3, 
    title: "Sleep Well", 
    duration: "15 min", 
    image: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=800&auto=format&fit=crop&q=60", 
    description: "Prepare your mind and body for restful sleep with this calming meditation." 
  },
  { 
    id: 4, 
    title: "Anxiety Relief", 
    duration: "8 min", 
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60", 
    description: "Calm your nervous system and reduce anxiety with this guided practice." 
  },
];

// Breathing exercises
const breathingExercises: Exercise[] = [
  { 
    id: 1, 
    title: "4-7-8 Breathing", 
    duration: "3 min", 
    description: "Inhale for 4, hold for 7, exhale for 8. A powerful technique for stress relief." 
  },
  { 
    id: 2, 
    title: "Box Breathing", 
    duration: "5 min", 
    description: "Equal parts inhale, hold, exhale, and hold. Great for focus and calm." 
  },
  { 
    id: 3, 
    title: "Diaphragmatic Breathing", 
    duration: "4 min", 
    description: "Deep belly breathing for relaxation and better oxygen flow." 
  },
];

// Music tracks
const musicTracks: MusicTrack[] = [
  { 
    id: 1, 
    title: "Gentle Rain", 
    duration: "20 min", 
    artist: "Nature Sounds",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3?filename=gentle-rain-ambient-111154.mp3"
  },
  { 
    id: 2, 
    title: "Ocean Waves", 
    duration: "15 min", 
    artist: "Calm Waters",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8f3c9c9.mp3?filename=ocean-waves-ambient-111157.mp3"
  },
  { 
    id: 3, 
    title: "Forest Ambience", 
    duration: "30 min", 
    artist: "Nature Sounds",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3?filename=forest-ambience-111155.mp3"
  },
  { 
    id: 4, 
    title: "Tibetan Bowls", 
    duration: "25 min", 
    artist: "Sound Healing",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3?filename=tibetan-bowls-111156.mp3"
  },
];

// Tutorial videos
const tutorialVideos: Exercise[] = [
  { 
    id: 1, 
    title: "Meditation Basics", 
    duration: "5:30", 
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&auto=format&fit=crop&q=60",
    videoUrl: "https://www.youtube.com/embed/O-6f5wQXSu8"
  },
  { 
    id: 2, 
    title: "Creating a Meditation Space", 
    duration: "4:15", 
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=60",
    videoUrl: "https://www.youtube.com/embed/1vx8iUvfyCY"
  },
  { 
    id: 3, 
    title: "Mindfulness for Beginners", 
    duration: "8:20", 
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=60",
    videoUrl: "https://www.youtube.com/embed/ssss7V1_eyA"
  },
];

// Insights content
const insights = [
  { 
    id: 1, 
    title: "Your consistency has improved by 30% this week!", 
    description: "You've maintained a 7-day streak, with an average of 17.1 minutes per session.",
    icon: "trending-up",
    color: "text-green-500"
  },
  { 
    id: 2, 
    title: "Morning meditation boosts productivity", 
    description: "Your most productive days start with morning meditation. Try to maintain this habit!",
    icon: "sun",
    color: "text-yellow-500"
  },
  { 
    id: 3, 
    title: "Most popular time: Evening", 
    description: "You tend to meditate most often between 8-10 PM. Consider trying morning sessions for better sleep.",
    icon: "moon",
    color: "text-indigo-500"
  },
];

// Add schedule data
const weeklySchedule: DailySchedule[] = [
  { day: 'Monday', time: '08:00', duration: 15 },
  { day: 'Tuesday', time: '08:00', duration: 15 },
  { day: 'Wednesday', time: '08:00', duration: 15 },
  { day: 'Thursday', time: '08:00', duration: 15 },
  { day: 'Friday', time: '08:00', duration: 15 },
  { day: 'Saturday', time: '10:00', duration: 20 },
  { day: 'Sunday', time: '10:00', duration: 20 },
];

export default function MindfulnessPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'meditate';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes default
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null);
  const [dailyGoal, setDailyGoal] = useState(15); // Default 15 minutes
  const [schedule, setSchedule] = useState<DailySchedule[]>(weeklySchedule);
  const [editingDay, setEditingDay] = useState<string | null>(null);

  // Calculate total minutes from meditation data
  const totalMinutes = meditationData.reduce((sum, day) => sum + day.minutes, 0);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    // Extract minutes from duration string and convert to seconds
    const durationMatch = exercise.duration.match(/(\d+)/);
    const minutes = durationMatch ? parseInt(durationMatch[0]) : 5;
    setTimerSeconds(minutes * 60);
    setTimerRunning(true);
  };

  const startMusic = (music: MusicTrack) => {
    setSelectedMusic(music);
  };

  // Add schedule update handler
  const updateSchedule = (day: string, field: 'time' | 'duration', value: string | number) => {
    setSchedule(prev => prev.map(item => 
      item.day === day ? { ...item, [field]: value } : item
    ));
  };

  // Chart component
  const MeditationChart = () => {
    const maxMinutes = Math.max(...meditationData.map(d => d.minutes));
    const averageMinutes = Math.round(totalMinutes / meditationData.length);
    
    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
            <p className="text-sm text-indigo-500">{`${payload[0].value} minutes`}</p>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-500">{totalMinutes}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Minutes</p>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={meditationData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="#e5e7eb"
                opacity={0.2}
              />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ 
                  value: 'Minutes', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 }
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="minutes" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 p-4 rounded-lg border border-white/20">
            <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{averageMinutes}m</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/20">
            <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{meditationData.filter(d => d.streak).length} days</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/20">
            <p className="text-sm text-gray-500 dark:text-gray-400">Best Day</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">Sun</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">Mindfulness & Calm</h1>
          <p className="opacity-90">Guided meditation and breathing exercises for relaxation</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('meditate')}
              className={`px-4 py-3 font-medium flex items-center transition-colors ${
                activeTab === 'meditate' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              <Clock size={16} className="mr-2" /> Meditate
            </button>
            <button 
              onClick={() => setActiveTab('breathe')}
              className={`px-4 py-3 font-medium flex items-center transition-colors ${
                activeTab === 'breathe' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              <Play size={16} className="mr-2" /> Breathing
            </button>
            <button 
              onClick={() => setActiveTab('music')}
              className={`px-4 py-3 font-medium flex items-center transition-colors ${
                activeTab === 'music' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              <Music size={16} className="mr-2" /> Music
            </button>
            <button 
              onClick={() => setActiveTab('learn')}
              className={`px-4 py-3 font-medium flex items-center transition-colors ${
                activeTab === 'learn' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              <Video size={16} className="mr-2" /> Learn
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-3 font-medium flex items-center transition-colors ${
                activeTab === 'insights' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              <BarChart2 size={16} className="mr-2" /> Insights
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-3 font-medium flex items-center transition-colors ${
                activeTab === 'schedule' 
                  ? 'text-indigo-500 border-b-2 border-indigo-500' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
              }`}
            >
              <Calendar size={16} className="mr-2" /> Schedule
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active meditation section */}
          {(timerRunning || currentExercise) && (
            <div className="lg:col-span-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentExercise ? currentExercise.title : "Meditation Timer"}
                </h2>
                <button 
                  onClick={() => {
                    setTimerRunning(false);
                    setCurrentExercise(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Close
                </button>
              </div>
              
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{formatTime(timerSeconds)}</div>
                <button
                  onClick={toggleTimer}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all"
                >
                  {timerRunning ? <Pause size={28} /> : <Play size={28} />}
                </button>
              </div>
              
              {currentExercise?.description && (
                <div className="bg-white/10 p-4 rounded-lg mt-4 border border-white/20">
                  <p className="text-gray-800 dark:text-white/90">{currentExercise.description}</p>
                </div>
              )}
              
              {selectedMusic && (
                <div className="flex items-center mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
                  <Music size={18} className="text-gray-600 dark:text-gray-300 mr-2" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedMusic.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMusic.artist}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Tab Content */}
          {activeTab === 'meditate' && !currentExercise && (
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Guided Meditations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guidedMeditations.map((meditation) => (
                  <div 
                    key={meditation.id} 
                    className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all border border-white/10"
                    onClick={() => startExercise(meditation)}
                  >
                    <img src={meditation.image} alt={meditation.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">{meditation.title}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{meditation.duration}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{meditation.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'breathe' && !currentExercise && (
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Breathing Exercises</h2>
              <div className="space-y-3">
                {breathingExercises.map((exercise) => (
                  <div 
                    key={exercise.id} 
                    className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg p-4 flex justify-between items-center cursor-pointer hover:shadow-xl transition-all border border-white/10"
                    onClick={() => startExercise(exercise)}
                  >
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{exercise.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{exercise.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{exercise.duration}</span>
                      <Play size={16} className="text-indigo-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'music' && (
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Meditation Music</h2>
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg divide-y divide-white/10 border border-white/10">
                {musicTracks.map((track) => (
                  <div 
                    key={track.id} 
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => startMusic(track)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                        <Music size={16} className="text-indigo-500" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{track.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{track.duration}</span>
                      <audio controls className="w-32">
                        <source src={track.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'learn' && (
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tutorial Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tutorialVideos.map((video) => (
                  <div key={video.id} className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all border border-white/10">
                    <div className="relative">
                      <img src={video.image} alt={video.title} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-full p-3">
                          <Play size={24} className="text-indigo-500" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">{video.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{video.duration}</p>
                      {video.videoUrl && (
                        <div className="mt-4 aspect-video">
                          <iframe
                            src={video.videoUrl}
                            title={video.title}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'insights' && (
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Your Meditation Journey</h2>
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10">
                  <MeditationChart />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Daily Goal</h2>
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Set your daily meditation goal</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Choose how many minutes you want to meditate each day</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setDailyGoal(prev => Math.max(5, prev - 5))}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
                      </button>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white min-w-[60px] text-center">
                        {dailyGoal}m
                      </span>
                      <button
                        onClick={() => setDailyGoal(prev => Math.min(60, prev + 5))}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{totalMinutes}/{dailyGoal * 7} minutes</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (totalMinutes / (dailyGoal * 7)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Insights</h2>
                <div className="space-y-3">
                  {insights.map((insight) => (
                    <div key={insight.id} className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/10">
                      <div className="flex items-start">
                        <div className={`${insight.color} mt-1 mr-3`}>
                          {insight.icon === 'trending-up' && <TrendingUp size={18} />}
                          {insight.icon === 'sun' && <Sun size={18} />}
                          {insight.icon === 'moon' && <Moon size={18} />}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{insight.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Weekly Summary</h2>
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-sm text-gray-700 dark:text-gray-300">Total time</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalMinutes} minutes</p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-sm text-gray-700 dark:text-gray-300">Sessions</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">7 sessions</p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-sm text-gray-700 dark:text-gray-300">Longest session</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">30 minutes</p>
                    </div>
                    <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                      <p className="text-sm text-gray-700 dark:text-gray-300">Streak</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">7 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'schedule' && (
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Weekly Meditation Schedule</h2>
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg shadow-lg border border-white/10">
                <div className="divide-y divide-white/10">
                  {schedule.map((item) => (
                    <div key={item.day} className="p-4 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{item.day}</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Time:</span>
                            <input
                              type="time"
                              value={item.time}
                              onChange={(e) => updateSchedule(item.day, 'time', e.target.value)}
                              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                            <select
                              value={item.duration}
                              onChange={(e) => updateSchedule(item.day, 'duration', parseInt(e.target.value))}
                              className="bg-white/10 border border-white/20 rounded px-2 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              {[5, 10, 15, 20, 30, 45, 60].map((mins) => (
                                <option key={mins} value={mins}>{mins} min</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white/5 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total weekly meditation time: {schedule.reduce((sum, item) => sum + item.duration, 0)} minutes
                    </p>
                    <button
                      onClick={() => {
                        // Save schedule logic here
                        alert('Schedule saved!');
                      }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Save Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}