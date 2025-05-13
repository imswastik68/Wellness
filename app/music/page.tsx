'use client';

import { useState } from 'react';
import { Music, Play, Pause, Heart, Clock, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MusicTrack {
  id: number;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  imageUrl: string;
  category: 'focus' | 'relaxation' | 'sleep' | 'meditation' | 'nature' | 'binaural';
}

const musicTracks: MusicTrack[] = [
  // Focus Tracks
  {
    id: 1,
    title: "Focus Flow",
    artist: "Study Beats",
    duration: "3:45",
    audioUrl: "https://example.com/focus-flow.mp3",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop",
    category: "focus"
  },
  {
    id: 2,
    title: "Deep Focus",
    artist: "Concentration Station",
    duration: "4:20",
    audioUrl: "https://example.com/deep-focus.mp3",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=500&fit=crop",
    category: "focus"
  },
  {
    id: 3,
    title: "Productivity Boost",
    artist: "Brain Waves",
    duration: "5:15",
    audioUrl: "https://example.com/productivity-boost.mp3",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=500&fit=crop",
    category: "focus"
  },
  {
    id: 4,
    title: "Study Session",
    artist: "Academic Ambience",
    duration: "4:30",
    audioUrl: "https://example.com/study-session.mp3",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=500&fit=crop",
    category: "focus"
  },

  // Relaxation Tracks
  {
    id: 5,
    title: "Calm Waters",
    artist: "Nature Sounds",
    duration: "5:15",
    audioUrl: "https://example.com/calm-waters.mp3",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop",
    category: "relaxation"
  },
  {
    id: 6,
    title: "Peaceful Mind",
    artist: "Meditation Music",
    duration: "6:30",
    audioUrl: "https://example.com/peaceful-mind.mp3",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop",
    category: "relaxation"
  },
  {
    id: 7,
    title: "Gentle Breeze",
    artist: "Ambient Dreams",
    duration: "4:45",
    audioUrl: "https://example.com/gentle-breeze.mp3",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=500&fit=crop",
    category: "relaxation"
  },
  {
    id: 8,
    title: "Evening Serenity",
    artist: "Tranquil Tunes",
    duration: "5:50",
    audioUrl: "https://example.com/evening-serenity.mp3",
    imageUrl: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&h=500&fit=crop",
    category: "relaxation"
  },

  // Sleep Tracks
  {
    id: 9,
    title: "Sleep Well",
    artist: "Dream Weaver",
    duration: "8:00",
    audioUrl: "https://example.com/sleep-well.mp3",
    imageUrl: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=500&h=500&fit=crop",
    category: "sleep"
  },
  {
    id: 10,
    title: "Night Lullaby",
    artist: "Sleep Sounds",
    duration: "7:45",
    audioUrl: "https://example.com/night-lullaby.mp3",
    imageUrl: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=500&h=500&fit=crop",
    category: "sleep"
  },
  {
    id: 11,
    title: "Deep Slumber",
    artist: "Night Whispers",
    duration: "9:15",
    audioUrl: "https://example.com/deep-slumber.mp3",
    imageUrl: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=500&h=500&fit=crop",
    category: "sleep"
  },
  {
    id: 12,
    title: "Moonlight Melody",
    artist: "Dreamscape",
    duration: "8:30",
    audioUrl: "https://example.com/moonlight-melody.mp3",
    imageUrl: "https://images.unsplash.com/photo-1531353826977-0941b4779a1c?w=500&h=500&fit=crop",
    category: "sleep"
  },

  // Meditation Tracks
  {
    id: 13,
    title: "Mindful Moment",
    artist: "Zen Master",
    duration: "10:00",
    audioUrl: "https://example.com/mindful-moment.mp3",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop",
    category: "meditation"
  },
  {
    id: 14,
    title: "Inner Peace",
    artist: "Meditation Guide",
    duration: "15:00",
    audioUrl: "https://example.com/inner-peace.mp3",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&h=500&fit=crop",
    category: "meditation"
  },
  {
    id: 15,
    title: "Breathing Space",
    artist: "Mindful Living",
    duration: "12:30",
    audioUrl: "https://example.com/breathing-space.mp3",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop",
    category: "meditation"
  },
  {
    id: 16,
    title: "Present Moment",
    artist: "Zen Journey",
    duration: "20:00",
    audioUrl: "https://example.com/present-moment.mp3",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&h=500&fit=crop",
    category: "meditation"
  },

  // Nature Sounds
  {
    id: 17,
    title: "Forest Stream",
    artist: "Nature's Symphony",
    duration: "6:00",
    audioUrl: "https://example.com/forest-stream.mp3",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop",
    category: "nature"
  },
  {
    id: 18,
    title: "Ocean Waves",
    artist: "Coastal Sounds",
    duration: "7:30",
    audioUrl: "https://example.com/ocean-waves.mp3",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop",
    category: "nature"
  },
  {
    id: 19,
    title: "Rainfall",
    artist: "Weather Ambience",
    duration: "8:45",
    audioUrl: "https://example.com/rainfall.mp3",
    imageUrl: "https://images.unsplash.com/photo-1501691223387-dd0506c89d7a?w=500&h=500&fit=crop",
    category: "nature"
  },
  {
    id: 20,
    title: "Mountain Wind",
    artist: "Natural Elements",
    duration: "5:15",
    audioUrl: "https://example.com/mountain-wind.mp3",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=500&fit=crop",
    category: "nature"
  },

  // Binaural Beats
  {
    id: 21,
    title: "Alpha Waves",
    artist: "Brain Sync",
    duration: "30:00",
    audioUrl: "https://example.com/alpha-waves.mp3",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=500&fit=crop",
    category: "binaural"
  },
  {
    id: 22,
    title: "Theta Meditation",
    artist: "Frequency Master",
    duration: "45:00",
    audioUrl: "https://example.com/theta-meditation.mp3",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop",
    category: "binaural"
  },
  {
    id: 23,
    title: "Delta Sleep",
    artist: "Deep Sleep",
    duration: "60:00",
    audioUrl: "https://example.com/delta-sleep.mp3",
    imageUrl: "https://images.unsplash.com/photo-1511295742362-92c96b1cf484?w=500&h=500&fit=crop",
    category: "binaural"
  },
  {
    id: 24,
    title: "Gamma Focus",
    artist: "Brain Boost",
    duration: "20:00",
    audioUrl: "https://example.com/gamma-focus.mp3",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=500&fit=crop",
    category: "binaural"
  }
];

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState<'focus' | 'relaxation' | 'sleep' | 'meditation' | 'nature' | 'binaural'>('focus');
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredTracks = musicTracks.filter(track => track.category === activeCategory);

  const handlePlay = (track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            Music for Your Mood
          </h1>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Curated playlists to enhance your focus, relaxation, and sleep
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant={activeCategory === 'focus' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('focus')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Music className="mr-2 h-4 w-4" />
            Focus & Study
          </Button>
          <Button
            variant={activeCategory === 'relaxation' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('relaxation')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Music className="mr-2 h-4 w-4" />
            Relaxation
          </Button>
          <Button
            variant={activeCategory === 'sleep' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('sleep')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Music className="mr-2 h-4 w-4" />
            Sleep Aid
          </Button>
          <Button
            variant={activeCategory === 'meditation' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('meditation')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Music className="mr-2 h-4 w-4" />
            Meditation
          </Button>
          <Button
            variant={activeCategory === 'nature' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('nature')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Music className="mr-2 h-4 w-4" />
            Nature Sounds
          </Button>
          <Button
            variant={activeCategory === 'binaural' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('binaural')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            <Music className="mr-2 h-4 w-4" />
            Binaural Beats
          </Button>
        </div>

        {currentTrack && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <Music className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{currentTrack.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{currentTrack.artist}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTracks.map((track) => (
            <Card key={track.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={track.imageUrl} 
                    alt={track.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="text-sm text-white bg-black/50 px-2 py-1 rounded-full flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {track.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{track.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{track.artist}</p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    onClick={() => handlePlay(track)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}