'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area } from 'recharts';
import { Calendar, Clock, Smile, TrendingUp, Activity, Plus, User } from 'lucide-react';
import _ from 'lodash';

interface Mood {
  value: number;
  label: string;
  color: string;
  emoji: string;
}

interface MoodEntry {
  id: number;
  date: string;
  time: string;
  mood: number;
  activities: string[];
  notes: string;
}

interface NewEntry {
  date: string;
  time: string;
  mood: number;
  activities: string[];
  notes: string;
}

interface DateRange {
  start: string;
  end: string;
}

interface ActivityData {
  activity: string;
  avgMood: number;
  count: number;
}

interface DistributionData {
  name: string;
  value: number;
  color: string;
}

interface TimeData {
  name: string;
  avgMood: number;
  count: number;
}

interface Insight {
  type: string;
  text: string;
}

interface ChartValue {
  value: number;
}

// Define mood types and colors
const MOODS: Mood[] = [
  { value: 5, label: 'Excellent', color: '#4CAF50', emoji: '😁' },
  { value: 4, label: 'Good', color: '#8BC34A', emoji: '😊' },
  { value: 3, label: 'Okay', color: '#FFC107', emoji: '😐' },
  { value: 2, label: 'Not great', color: '#FF9800', emoji: '😔' },
  { value: 1, label: 'Bad', color: '#F44336', emoji: '😢' }
];

// Activity options for tracking
const ACTIVITIES: string[] = [
  'Sleep', 'Work', 'Exercise', 'Meal', 'Social', 
  'Hobby', 'Relax', 'Study', 'Media', 'Chores'
];

// Mock data - prefilled mood entries
const initialMoodData: MoodEntry[] = [
  { id: 1, date: '2025-05-06', time: '08:30', mood: 3, activities: ['Sleep', 'Work'], notes: 'Started the day feeling neutral.' },
  { id: 2, date: '2025-05-06', time: '13:00', mood: 4, activities: ['Exercise', 'Meal'], notes: 'Workout made me feel better!' },
  { id: 3, date: '2025-05-06', time: '20:00', mood: 5, activities: ['Social', 'Hobby'], notes: 'Great dinner with friends.' },
  { id: 4, date: '2025-05-07', time: '09:00', mood: 2, activities: ['Sleep', 'Work'], notes: 'Poor sleep, feeling tired.' },
  { id: 5, date: '2025-05-07', time: '15:00', mood: 3, activities: ['Work', 'Hobby'], notes: 'Getting better after coffee.' },
  { id: 6, date: '2025-05-07', time: '21:00', mood: 4, activities: ['Relax', 'Media'], notes: 'Relaxing evening.' },
  { id: 7, date: '2025-05-08', time: '08:00', mood: 1, activities: ['Sleep', 'Work'], notes: 'Terrible night, stressed about work.' },
  { id: 8, date: '2025-05-08', time: '12:30', mood: 2, activities: ['Work', 'Meal'], notes: 'Still feeling overwhelmed.' },
  { id: 9, date: '2025-05-08', time: '19:00', mood: 3, activities: ['Exercise', 'Meal'], notes: 'Evening walk helped me calm down.' },
  { id: 10, date: '2025-05-09', time: '07:45', mood: 3, activities: ['Sleep', 'Meal'], notes: 'Ordinary morning.' },
  { id: 11, date: '2025-05-09', time: '14:00', mood: 4, activities: ['Work', 'Social'], notes: 'Productive team meeting!' },
  { id: 12, date: '2025-05-09', time: '22:00', mood: 5, activities: ['Social', 'Hobby'], notes: 'Great movie night.' },
  { id: 13, date: '2025-05-10', time: '09:30', mood: 4, activities: ['Sleep', 'Exercise'], notes: 'Refreshed after good sleep.' },
  { id: 14, date: '2025-05-10', time: '16:00', mood: 5, activities: ['Hobby', 'Relax'], notes: 'Perfect Saturday afternoon.' },
  { id: 15, date: '2025-05-10', time: '21:30', mood: 4, activities: ['Social', 'Media'], notes: 'Nice video call with family.' },
  { id: 16, date: '2025-05-11', time: '10:00', mood: 5, activities: ['Sleep', 'Hobby'], notes: 'Slept in, feeling great!' },
  { id: 17, date: '2025-05-11', time: '14:30', mood: 3, activities: ['Meal', 'Chores'], notes: 'Busy with housework.' },
  { id: 18, date: '2025-05-11', time: '20:00', mood: 4, activities: ['Relax', 'Media'], notes: 'Preparing for the week ahead.' },
  { id: 19, date: '2025-05-12', time: '08:00', mood: 3, activities: ['Sleep', 'Work'], notes: 'Monday morning, feeling okay.' },
  { id: 20, date: '2025-05-12', time: '13:30', mood: 2, activities: ['Work', 'Meal'], notes: 'Stressful project deadline.' },
  { id: 21, date: '2025-05-12', time: '19:00', mood: 3, activities: ['Exercise', 'Meal'], notes: 'Exercise helped reduce stress.' },
  { id: 22, date: '2025-05-13', time: '07:30', mood: 4, activities: ['Sleep', 'Work'], notes: 'Good start to the day.' }
];

export default function MoodTracker() {
  const [moodData, setMoodData] = useState<MoodEntry[]>(initialMoodData);
  const [currentView, setCurrentView] = useState('dashboard');
  const [newEntry, setNewEntry] = useState<NewEntry>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    mood: 3,
    activities: [],
    notes: ''
  });
  
  const [dateRange, setDateRange] = useState<DateRange>({
    start: '2025-05-06',
    end: '2025-05-13'
  });
  
  const filteredData = moodData.filter(entry => 
    entry.date >= dateRange.start && entry.date <= dateRange.end
  );
  
  const handleAddEntry = () => {
    const newId = moodData.length > 0 ? Math.max(...moodData.map(item => item.id)) + 1 : 1;
    const entryToAdd: MoodEntry = {
      ...newEntry,
      id: newId
    };
    
    setMoodData([...moodData, entryToAdd]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      mood: 3,
      activities: [],
      notes: ''
    });
    setCurrentView('dashboard');
  };
  
  const toggleActivity = (activity: string) => {
    if (newEntry.activities.includes(activity)) {
      setNewEntry({
        ...newEntry,
        activities: newEntry.activities.filter(item => item !== activity)
      });
    } else {
      setNewEntry({
        ...newEntry,
        activities: [...newEntry.activities, activity]
      });
    }
  };
  
  const prepareLineChartData = () => {
    const groupedByDate = _.groupBy(filteredData, 'date');
    
    return Object.keys(groupedByDate).map(date => {
      const entries = groupedByDate[date];
      const avgMood = _.meanBy(entries, 'mood');
      
      return {
        date,
        avgMood,
        count: entries.length
      };
    });
  };
  
  const lineChartData = prepareLineChartData();
  
  const activityCorrelation = (): ActivityData[] => {
    const result: Record<string, ActivityData> = {};
    
    ACTIVITIES.forEach(activity => {
      const entriesWithActivity = filteredData.filter(entry => 
        entry.activities.includes(activity)
      );
      
      if (entriesWithActivity.length > 0) {
        const avgMood = _.meanBy(entriesWithActivity, 'mood');
        result[activity] = {
          activity,
          avgMood,
          count: entriesWithActivity.length
        };
      }
    });
    
    return Object.values(result).sort((a, b) => b.avgMood - a.avgMood);
  };
  
  const activityData = activityCorrelation();
  
  const moodDistribution = (): DistributionData[] => {
    const distribution: Record<string, DistributionData> = {};
    
    MOODS.forEach(mood => {
      distribution[mood.label] = {
        name: mood.label,
        value: filteredData.filter(entry => entry.mood === mood.value).length,
        color: mood.color
      };
    });
    
    return Object.values(distribution);
  };
  
  const distributionData = moodDistribution();
  
  const timeOfDayAnalysis = (): TimeData[] => {
    const morning = filteredData.filter(entry => {
      const hour = parseInt(entry.time.split(':')[0]);
      return hour >= 5 && hour < 12;
    });
    
    const afternoon = filteredData.filter(entry => {
      const hour = parseInt(entry.time.split(':')[0]);
      return hour >= 12 && hour < 17;
    });
    
    const evening = filteredData.filter(entry => {
      const hour = parseInt(entry.time.split(':')[0]);
      return hour >= 17 && hour < 22;
    });
    
    const night = filteredData.filter(entry => {
      const hour = parseInt(entry.time.split(':')[0]);
      return hour >= 22 || hour < 5;
    });
    
    return [
      { name: 'Morning', avgMood: morning.length ? _.meanBy(morning, 'mood') : 0, count: morning.length },
      { name: 'Afternoon', avgMood: afternoon.length ? _.meanBy(afternoon, 'mood') : 0, count: afternoon.length },
      { name: 'Evening', avgMood: evening.length ? _.meanBy(evening, 'mood') : 0, count: evening.length },
      { name: 'Night', avgMood: night.length ? _.meanBy(night, 'mood') : 0, count: night.length }
    ];
  };
  
  const timeData = timeOfDayAnalysis();
  
  const calculateInsights = (): Insight[] => {
    if (filteredData.length === 0) return [];
    
    const insights: Insight[] = [];
    
    const avgMood = _.meanBy(filteredData, 'mood');
    insights.push({
      type: 'average',
      text: `Your average mood is ${(avgMood as number).toFixed(1)} out of 5`
    });
    
    const moodCounts = _.countBy(filteredData, 'mood');
    const mostCommonMoodValue = parseInt(Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b));
    const mostCommonMood = MOODS.find(m => m.value === mostCommonMoodValue);
    
    if (mostCommonMood) {
      insights.push({
        type: 'common',
        text: `Your most common mood is "${mostCommonMood.label}" (${moodCounts[mostCommonMoodValue]} times)`
      });
    }
    
    const dailyAvgs = _.groupBy(filteredData, 'date');
    let bestDay = { date: '', avg: 0 };
    let worstDay = { date: '', avg: 6 };
    
    Object.entries(dailyAvgs).forEach(([date, entries]) => {
      const avg = _.meanBy(entries, 'mood');
      if (avg > bestDay.avg) {
        bestDay = { date, avg: avg as number };
      }
      if (avg < worstDay.avg) {
        worstDay = { date, avg: avg as number };
      }
    });
    
    if (bestDay.date) {
      insights.push({
        type: 'best',
        text: `Your best day was ${bestDay.date} with average mood ${bestDay.avg.toFixed(1)}`
      });
    }
    
    if (worstDay.date) {
      insights.push({
        type: 'worst',
        text: `Your most challenging day was ${worstDay.date} with average mood ${worstDay.avg.toFixed(1)}`
      });
    }
    
    if (activityData.length > 0) {
      const bestActivity = activityData[0];
      insights.push({
        type: 'activity',
        text: `"${bestActivity.activity}" is associated with your highest mood (avg: ${bestActivity.avgMood.toFixed(1)})`
      });
    }
    
    const bestTimeOfDay = _.maxBy(timeData, 'avgMood');
    if (bestTimeOfDay && bestTimeOfDay.count > 0) {
      insights.push({
        type: 'time',
        text: `You tend to feel best during ${bestTimeOfDay.name.toLowerCase()} hours`
      });
    }
    
    return insights;
  };
  
  const insights = calculateInsights();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {currentView === 'dashboard' ? (
          <div className="grid grid-cols-12 gap-6">
            {/* Header & Controls */}
            <div className="col-span-12 flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mood Tracker</h1>
                <p className="text-gray-600 dark:text-gray-300">Track, visualize, and understand your emotional patterns</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="border rounded-lg p-2 text-sm bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  />
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  <input 
                    type="date" 
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="border rounded-lg p-2 text-sm bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <button 
                  onClick={() => setCurrentView('addEntry')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:from-pink-600 hover:to-rose-600 transition-all"
                >
                  <Plus size={16} /> Add Entry
                </button>
              </div>
            </div>
            
            {/* Mood Timeline Chart */}
            <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <TrendingUp size={18} /> Mood Timeline
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={lineChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(255,255,255,0.2)" 
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="date" 
                      stroke="rgba(255,255,255,0.8)"
                      tick={{ fill: 'rgba(255,255,255,0.8)' }}
                      tickLine={{ stroke: 'rgba(255,255,255,0.8)' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.8)' }}
                      tickFormatter={(date) => {
                        const [year, month, day] = date.split('-');
                        return `${day}/${month}`;
                      }}
                    />
                    <YAxis 
                      domain={[1, 5]} 
                      tickCount={5}
                      stroke="rgba(255,255,255,0.8)"
                      tick={{ fill: 'rgba(255,255,255,0.8)' }}
                      tickLine={{ stroke: 'rgba(255,255,255,0.8)' }}
                      axisLine={{ stroke: 'rgba(255,255,255,0.8)' }}
                      tickFormatter={(value) => {
                        const mood = MOODS.find(m => m.value === value);
                        return mood ? `${mood.emoji} ${value}` : value;
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: 'none',
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                      formatter={(value: any) => {
                        const moodValue = typeof value === 'number' ? value : 0;
                        const mood = MOODS.find(m => m.value === Math.round(moodValue));
                        return [
                          <div key="value" className="flex items-center gap-2">
                            <span className="text-2xl">{mood?.emoji}</span>
                            <span>{moodValue.toFixed(1)}</span>
                          </div>,
                          'Average Mood'
                        ];
                      }}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      content={({ payload }) => (
                        <div className="flex justify-center gap-4 text-sm text-gray-700 dark:text-white/80">
                          {payload?.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: entry.color }}
                              />
                              <span>{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgMood" 
                      stroke="#8884d8" 
                      name="Mood" 
                      strokeWidth={3}
                      dot={{ 
                        r: 6, 
                        fill: '#8884d8',
                        stroke: '#fff',
                        strokeWidth: 2
                      }}
                      activeDot={{ 
                        r: 8, 
                        fill: '#8884d8',
                        stroke: '#fff',
                        strokeWidth: 2
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="avgMood"
                      stroke="false"
                      fillOpacity={0.3}
                      fill="url(#moodGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center gap-4">
                {MOODS.map((mood) => (
                  <div key={mood.value} className="flex items-center gap-2 text-sm text-gray-700 dark:text-white/80">
                    <span className="text-lg">{mood.emoji}</span>
                    <span>{mood.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Insights */}
            <div className="col-span-12 lg:col-span-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Activity size={18} /> Insights
              </h2>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/10 border border-white/20">
                    <p className="text-gray-800 dark:text-white/90">{insight.text}</p>
                  </div>
                ))}
                {insights.length === 0 && (
                  <p className="text-gray-700 dark:text-white/70 italic">Add more entries to see insights</p>
                )}
              </div>
            </div>
            
            {/* Mood Distribution */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-teal-500/20 to-emerald-600/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Smile size={18} /> Mood Distribution
              </h2>
              <div className="h-64 flex justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#ffffff"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }}
                      formatter={(value: any) => [typeof value === 'number' ? value.toFixed(1) : value, 'Entries']} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Activity Impact */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Activity size={18} /> Activity Impact
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData.slice(0, 5)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.2)" />
                    <XAxis type="number" domain={[0, 5]} stroke="rgba(255,255,255,0.8)" />
                    <YAxis type="category" dataKey="activity" width={70} stroke="rgba(255,255,255,0.8)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }}
                      formatter={(value: any) => [typeof value === 'number' ? value.toFixed(1) : value, 'Avg Mood']} 
                    />
                    <Bar 
                      dataKey="avgMood" 
                      fill="#ffffff" 
                      background={{ fill: 'rgba(255,255,255,0.1)' }} 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Time of Day Analysis */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Clock size={18} /> Time of Day
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.2)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.8)" />
                    <YAxis domain={[0, 5]} stroke="rgba(255,255,255,0.8)" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }}
                      formatter={(value: any) => [typeof value === 'number' ? value.toFixed(1) : value, 'Avg Mood']} 
                    />
                    <Bar 
                      dataKey="avgMood" 
                      fill="#ffffff" 
                      background={{ fill: 'rgba(255,255,255,0.1)' }} 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Entries */}
            <div className="col-span-12 bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/10">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar size={18} /> Recent Entries
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/20">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-white/70 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-white/70 uppercase tracking-wider">Mood</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-white/70 uppercase tracking-wider">Activities</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-white/70 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    {filteredData.slice().reverse().slice(0, 5).map((entry) => {
                      const moodInfo = MOODS.find(m => m.value === entry.mood) || {
                        color: '#ffffff',
                        emoji: '😐',
                        label: 'Unknown'
                      };
                      return (
                        <tr key={entry.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white/90">
                            {entry.date} at {entry.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span 
                                className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                                style={{ backgroundColor: moodInfo.color, color: 'white' }}
                              >
                                {moodInfo.emoji}
                              </span>
                              <span className="text-sm text-gray-800 dark:text-white/90">{moodInfo.label}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex flex-wrap gap-1">
                              {entry.activities.map((activity, i) => (
                                <span key={i} className="px-2 py-1 bg-white/20 text-gray-800 dark:text-white rounded-full text-xs">
                                  {activity}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 dark:text-white/80 max-w-xs truncate">
                            {entry.notes}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-700 dark:text-white/70">
                          No entries found for the selected date range
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-2xl mx-auto border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Mood Entry</h2>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Date and time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">Time</label>
                  <input 
                    type="time" 
                    value={newEntry.time}
                    onChange={(e) => setNewEntry({...newEntry, time: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>
              </div>
              
              {/* Mood selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">How are you feeling?</label>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg border border-white/20">
                  {MOODS.map((mood) => (
                    <button 
                      key={mood.value}
                      onClick={() => setNewEntry({...newEntry, mood: mood.value})}
                      className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                        newEntry.mood === mood.value 
                          ? 'bg-white/20 shadow-md scale-110' 
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span 
                        className={`text-sm mt-1 ${newEntry.mood === mood.value ? 'font-medium' : ''}`}
                        style={{ color: mood.color }}
                      >
                        {mood.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Activities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">Activities (select all that apply)</label>
                <div className="flex flex-wrap gap-2 p-3 bg-white/10 rounded-lg border border-white/20">
                  {ACTIVITIES.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => toggleActivity(activity)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        newEntry.activities.includes(activity) 
                          ? 'bg-white/20 text-gray-900 dark:text-white' 
                          : 'bg-white/10 text-gray-700 dark:text-white/80 hover:bg-white/20'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white/90 mb-1">Notes (optional)</label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                  placeholder="What's on your mind? Any factors affecting your mood?"
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-2 h-24 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              
              {/* Submit button */}
              <div className="pt-4">
                <button
                  onClick={handleAddEntry}
                  className="w-full bg-white/20 hover:bg-white/30 text-gray-900 dark:text-white py-3 rounded-lg font-medium transition-colors border border-white/20"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}