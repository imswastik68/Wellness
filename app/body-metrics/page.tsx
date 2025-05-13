'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Droplet, Moon, TrendingUp, Award, Calendar, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, TooltipProps } from 'recharts';

type MetricType = 'steps' | 'water' | 'sleep';

interface DataPoint {
  day: string;
  value: number;
}

interface MetricData {
  [key: string]: DataPoint[];
}

interface SummaryData {
  total: number;
  average: number;
  goalMet: number;
}

interface Summary {
  [key: string]: SummaryData;
}

interface NewValue {
  steps: string;
  water: string;
  sleep: string;
}

interface MetricCardProps {
  metric: MetricType;
  title: string;
  unit: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
  }>;
  label?: string;
}

const initialData: MetricData = {
  steps: [
    { day: 'Mon', value: 8547 },
    { day: 'Tue', value: 7890 },
    { day: 'Wed', value: 9200 },
    { day: 'Thu', value: 7650 },
    { day: 'Fri', value: 8900 },
    { day: 'Sat', value: 6500 },
    { day: 'Sun', value: 7800 }
  ],
  water: [
    { day: 'Mon', value: 1.5 },
    { day: 'Tue', value: 1.8 },
    { day: 'Wed', value: 2.0 },
    { day: 'Thu', value: 1.7 },
    { day: 'Fri', value: 1.9 },
    { day: 'Sat', value: 1.6 },
    { day: 'Sun', value: 1.8 }
  ],
  sleep: [
    { day: 'Mon', value: 7.5 },
    { day: 'Tue', value: 6.8 },
    { day: 'Wed', value: 7.2 },
    { day: 'Thu', value: 7.0 },
    { day: 'Fri', value: 6.5 },
    { day: 'Sat', value: 8.0 },
    { day: 'Sun', value: 7.8 }
  ]
};

const goals: Record<MetricType, number> = {
  steps: 10000,
  water: 2.5,
  sleep: 8
};

export default function BodyMetricsPage() {
  const [data, setData] = useState<MetricData>(initialData);
  const [newValue, setNewValue] = useState<NewValue>({
    steps: '',
    water: '',
    sleep: ''
  });
  const [timeRange, setTimeRange] = useState('week');
  const [summary, setSummary] = useState<Summary>({
    steps: { total: 0, average: 0, goalMet: 0 },
    water: { total: 0, average: 0, goalMet: 0 },
    sleep: { total: 0, average: 0, goalMet: 0 }
  });

  useEffect(() => {
    const calculateSummary = (metric: MetricType): SummaryData => {
      const values = data[metric].map(item => item.value);
      const total = values.reduce((sum: number, val: number) => sum + val, 0);
      const average = total / values.length;
      const goalMet = values.filter(val => val >= goals[metric]).length;
      
      return { total, average, goalMet };
    };

    setSummary({
      steps: calculateSummary('steps'),
      water: calculateSummary('water'),
      sleep: calculateSummary('sleep')
    });
  }, [data]);

  const handleAddValue = (metric: MetricType) => {
    const value = parseFloat(newValue[metric]);
    if (isNaN(value) || value < 0) return;

    const newData = { ...data };
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    newData[metric] = [...newData[metric].slice(1), { day: today, value: value }];
    
    setData(newData);
    setNewValue({ ...newValue, [metric]: '' });
  };
  
  const getProgressPercentage = (metric: MetricType): number => {
    const lastValue = data[metric][data[metric].length - 1].value;
    return Math.min(Math.round((lastValue / goals[metric]) * 100), 100);
  };

  const resetData = (metric: MetricType) => {
    if (window.confirm(`Are you sure you want to reset all ${metric} data?`)) {
      const defaultValues = data[metric].map(item => ({
        day: item.day,
        value: 0
      }));
      
      const newData = { ...data };
      newData[metric] = defaultValues;
      setData(newData);
    }
  };

  const updateGoal = (metric: MetricType) => {
    const newGoal = prompt(`Enter new goal for ${metric}:`, goals[metric].toString());
    if (newGoal && !isNaN(parseFloat(newGoal)) && parseFloat(newGoal) > 0) {
      goals[metric] = parseFloat(newGoal);
      alert(`New ${metric} goal set to ${goals[metric]}`);
    }
  };

  const getMetricColor = (metric: MetricType): string => {
    switch(metric) {
      case 'steps': return '#10b981';
      case 'water': return '#3b82f6';
      case 'sleep': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getMetricIcon = (metric: MetricType) => {
    switch(metric) {
      case 'steps': return <Activity className="h-6 w-6 text-emerald-500" />;
      case 'water': return <Droplet className="h-6 w-6 text-blue-500" />;
      case 'sleep': return <Moon className="h-6 w-6 text-purple-500" />;
      default: return null;
    }
  };

  const getMetricButtonColor = (metric: MetricType): string => {
    switch(metric) {
      case 'steps': return "bg-emerald-600 hover:bg-emerald-700 text-white";
      case 'water': return "bg-blue-600 hover:bg-blue-700 text-white";
      case 'sleep': return "bg-purple-600 hover:bg-purple-700 text-white";
      default: return "bg-gray-600 hover:bg-gray-700 text-white";
    }
  };

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-gray-700">{`${payload[0].value} ${payload[0].name === 'steps' ? 'steps' : payload[0].name === 'water' ? 'L' : 'hrs'}`}</p>
        </div>
      );
    }
    return null;
  };

  const MetricCard = ({ metric, title, unit }: MetricCardProps) => (
    <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getMetricIcon(metric)}
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
            Goal: {goals[metric]} {unit}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data[metric]}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                width={30} 
                domain={[0, 'auto']} 
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getMetricColor(metric)} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={getMetricColor(metric)} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                name={metric}
                stroke={getMetricColor(metric)} 
                fill={`url(#gradient-${metric})`} 
                strokeWidth={2}
                dot={{ stroke: getMetricColor(metric), strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, stroke: getMetricColor(metric), strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4 mb-2 text-center text-sm">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
            <div className="text-gray-500 dark:text-gray-400">Total</div>
            <div className="font-bold">{summary[metric].total.toFixed(metric === 'steps' ? 0 : 1)} {unit}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
            <div className="text-gray-500 dark:text-gray-400">Average</div>
            <div className="font-bold">{summary[metric].average.toFixed(metric === 'steps' ? 0 : 1)} {unit}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
            <div className="text-gray-500 dark:text-gray-400">Goal Met</div>
            <div className="font-bold">{summary[metric].goalMet}/{data[metric].length} days</div>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Today's Progress</span>
            <span>{getProgressPercentage(metric)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                metric === 'steps' ? 'bg-emerald-500' : 
                metric === 'water' ? 'bg-blue-500' : 
                'bg-purple-500'
              }`}
              style={{ width: `${getProgressPercentage(metric)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Input
            type="number"
            step={metric === 'steps' ? '1000' : '0.1'}
            min="0"
            placeholder={`Enter ${unit}`}
            value={newValue[metric]}
            onChange={(e) => setNewValue({ ...newValue, [metric]: e.target.value })}
            className="flex-1"
          />
          <Button 
            onClick={() => handleAddValue(metric)}
            className={getMetricButtonColor(metric)}
          >
            Add
          </Button>
        </div>
        <div className="flex gap-2 w-full mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs" 
            onClick={() => resetData(metric)}
          >
            Reset Data
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs" 
            onClick={() => updateGoal(metric)}
          >
            Update Goal
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Body Metrics Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Track your health and fitness progress</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue="week" className="w-full" onValueChange={setTimeRange}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MetricCard 
            metric="steps" 
            title="Steps" 
            unit="steps" 
          />
          
          <MetricCard 
            metric="water" 
            title="Water Intake" 
            unit="L" 
          />
          
          <MetricCard 
            metric="sleep" 
            title="Sleep Hours" 
            unit="hrs" 
          />
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Health Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <h3 className="font-semibold flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <Activity className="h-4 w-4" /> Steps
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {summary.steps.average > goals.steps * 0.8 ? 
                  "Great job staying active! You're close to your daily step goal." : 
                  "Try to increase your daily steps to reach your goal of " + goals.steps + " steps."}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold flex items-center gap-1 text-blue-700 dark:text-blue-400">
                <Droplet className="h-4 w-4" /> Hydration
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {summary.water.average > goals.water * 0.8 ? 
                  "You're doing great with hydration! Keep it up." : 
                  "Consider increasing your water intake to reach your goal of " + goals.water + "L per day."}
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold flex items-center gap-1 text-purple-700 dark:text-purple-400">
                <Moon className="h-4 w-4" /> Sleep
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {summary.sleep.average > goals.sleep * 0.9 ? 
                  "Excellent sleep habits! You're getting enough rest." : 
                  "Try to improve your sleep duration to reach your goal of " + goals.sleep + " hours."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}