'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { format, parseISO } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, BookOpen, Trash2, Search, Plus } from 'lucide-react';

// --- Data Structures ---
interface JournalEntry {
  id: string;
  date: string; // ISO string
  title: string;
  content: string;
  mood: Mood;
  imageUrl?: string; // Optional: for users to add an image URL
}

type Mood = '😄 Happy' | '😊 Content' | '😐 Neutral' | '😟 Worried' | '😢 Sad' | '😠 Angry' | '🤩 Inspired' | '🤔 Reflective';

const moods: Mood[] = ['😄 Happy', '😊 Content', '😐 Neutral', '😟 Worried', '😢 Sad', '😠 Angry', '🤩 Inspired', '🤔 Reflective'];

// --- Helper Functions ---
const generateId = (): string => Date.now().toString();

const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), "MMMM d, yyyy 'at' h:mm a");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

// --- Main App Component ---
const PersonalJournalApp: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'new' | 'edit'>('list');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // --- Local Storage Effects ---
  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries) as JournalEntry[];
        // Basic validation
        if (Array.isArray(parsedEntries) && parsedEntries.every(entry => entry.id && entry.date && entry.title && entry.content && entry.mood)) {
          setEntries(parsedEntries);
        } else {
          console.warn("Stored entries are not in the expected format. Initializing with empty array.");
          setEntries([]);
          localStorage.setItem('journalEntries', JSON.stringify([])); // Clear invalid data
        }
      } catch (error) {
        console.error("Error parsing stored entries:", error);
        setEntries([]); // Reset to empty if parsing fails
        localStorage.setItem('journalEntries', JSON.stringify([])); // Clear invalid data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // --- CRUD Operations ---
  const addEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: generateId(),
      date: new Date().toISOString(),
    };
    setEntries(prevEntries => [newEntry, ...prevEntries]);
    setCurrentView('list');
  };

  const updateEntry = (entry: JournalEntry | Omit<JournalEntry, 'id' | 'date'>) => {
    if ('id' in entry) {
      setEntries(prevEntries =>
        prevEntries.map(e => (e.id === entry.id ? entry : e))
      );
    } else {
      setEntries(prevEntries =>
        prevEntries.map(e => (e.id === selectedEntry?.id ? { ...e, ...entry } : e))
      );
    }
    setCurrentView('list');
    setSelectedEntry(undefined);
  };

  const deleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
      setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
      if (selectedEntry?.id === id) {
        setSelectedEntry(undefined);
        setCurrentView('list');
      }
    }
  };

  // --- View Navigation ---
  const handleNewEntryClick = () => {
    setSelectedEntry(undefined);
    setCurrentView('new');
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setCurrentView('edit');
  };

  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setCurrentView('list'); // Or a dedicated 'view' mode if preferred
  }

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedEntry(undefined);
  };

  // --- Search ---
  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.mood.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Render Logic ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 text-gray-900 dark:text-white">
      <header className="text-center mb-12 pt-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
          My Personal Journal
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Reflect on your day, capture your thoughts, and cherish your memories.
        </p>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'new' || (currentView === 'edit' && selectedEntry) ? (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <EntryForm
                onSubmit={currentView === 'new' ? addEntry : updateEntry}
                initialData={currentView === 'edit' ? selectedEntry : undefined}
                onCancel={handleBackToList}
              />
            </CardContent>
          </Card>
        ) : selectedEntry && currentView === 'list' ? (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <JournalEntryDisplay entry={selectedEntry} onEdit={handleEditEntry} onDelete={deleteEntry} />
              <Button
                onClick={handleBackToList}
                variant="outline"
                className="mt-6"
              >
                &larr; Back to All Entries
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Reflections</h2>
              <Button
                onClick={handleNewEntryClick}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {filteredEntries.length > 0 ? (
              <div className="grid gap-6">
                {filteredEntries.map(entry => (
                  <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <article onClick={() => handleViewEntry(entry)} className="cursor-pointer">
                        <header className="mb-3">
                          <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                            {entry.title}
                          </h3>
                          <time dateTime={entry.date} className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(entry.date)}
                          </time>
                        </header>
                        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                          {entry.content}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                            {entry.mood}
                          </span>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); handleEditEntry(entry); }}
                            >
                              <PenTool className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </article>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-10">
                <CardContent>
                  <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                    No entries yet, or no entries match your search.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click "New Entry" to capture your thoughts.
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
};

// --- EntryForm Component ---
interface EntryFormProps {
  onSubmit: (entry: Omit<JournalEntry, 'id' | 'date'> | JournalEntry) => void;
  initialData?: JournalEntry;
  onCancel: () => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [mood, setMood] = useState<Mood>(initialData?.mood || moods[0]);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }
    setError(null);

    const entryData = {
      title: title.trim(),
      content: content.trim(),
      mood,
      imageUrl: imageUrl.trim() || undefined,
    };

    if (initialData) {
      onSubmit({ ...initialData, ...entryData });
    } else {
      onSubmit(entryData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {initialData ? 'Edit Your Reflection' : 'Capture Your Thoughts'}
      </h2>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            How are you feeling?
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value as Mood)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {moods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          {initialData ? 'Save Changes' : 'Add Entry'}
        </Button>
      </div>
    </form>
  );
};


// --- JournalEntryDisplay Component (for detailed view) ---
interface JournalEntryDisplayProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      <header className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{entry.title}</h2>
        <time dateTime={entry.date} className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
          {formatDate(entry.date)}
        </time>
        <span className="mt-2 inline-block text-sm font-medium py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
          {entry.mood}
        </span>
      </header>

      {entry.imageUrl && (
        <div className="rounded-lg overflow-hidden">
          <img src={entry.imageUrl} alt={entry.title} className="w-full h-auto max-h-96 object-cover" />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {entry.content}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          variant="outline"
          onClick={() => onEdit(entry)}
        >
          <PenTool className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(entry.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};


// --- SVG Icons (simple placeholders) ---
const PencilIcon: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

export default PersonalJournalApp;