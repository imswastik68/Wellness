import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Quote {
  text: string;
  author: string;
}

interface QuotesCarouselProps {
  showHeader?: boolean;
}

const quotes: Quote[] = [
  {
    text: "The greatest wealth is health.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    author: "Jim Rohn"
  },
  {
    text: "Health is a state of complete harmony of the body, mind and spirit.",
    author: "B.K.S. Iyengar"
  },
  {
    text: "The first wealth is health.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Your body hears everything your mind says.",
    author: "Naomi Judd"
  },
  {
    text: "The mind and body are not separate. What affects one, affects the other.",
    author: "Unknown"
  },
  {
    text: "Wellness is the complete integration of body, mind, and spirit.",
    author: "Greg Anderson"
  },
  {
    text: "The groundwork of all happiness is health.",
    author: "Leigh Hunt"
  },
  {
    text: "A healthy outside starts from the inside.",
    author: "Robert Urich"
  },
  {
    text: "The greatest healing therapy is friendship and love.",
    author: "Hubert H. Humphrey"
  }
];

export const QuotesCarousel = ({ showHeader = false }: QuotesCarouselProps) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div className="w-full">
      {showHeader && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Daily Wellness Quotes</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover inspiring quotes about health, wellness, and personal growth. 
            Let these words motivate and guide you on your wellness journey.
          </p>
        </div>
      )}

      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
        
        <Card className="relative bg-gradient-to-r from-teal-100/50 to-blue-100/50 dark:from-teal-900/30 dark:to-blue-900/30 border-teal-200 dark:border-teal-800 transition-all duration-300 group-hover:scale-[1.02]">
          <CardContent className="p-6">
            <div className="relative">
              <div className="text-center py-6 min-h-[150px] flex flex-col justify-center">
                <Heart className={`h-10 w-10 text-teal-600 dark:text-teal-400 mx-auto mb-4 transition-transform duration-300 ${isHovered ? 'scale-110' : 'animate-pulse'}`} />
                <p className="text-xl italic font-serif mb-3 text-gray-800 dark:text-gray-200 transition-all duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
                  "{quotes[currentQuoteIndex].text}"
                </p>
                <p className="text-gray-700 dark:text-gray-400 font-medium transition-all duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-300">
                  - {quotes[currentQuoteIndex].author}
                </p>
              </div>
              <button
                onClick={handlePrevQuote}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-[1]"
                aria-label="Previous quote"
              >
                <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={handleNextQuote}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-[1]"
                aria-label="Next quote"
              >
                <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              {quotes.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentQuoteIndex
                      ? 'bg-teal-600 dark:bg-teal-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {showHeader && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            New quotes are added regularly. Check back often for fresh inspiration!
          </p>
        </div>
      )}
    </div>
  );
}; 