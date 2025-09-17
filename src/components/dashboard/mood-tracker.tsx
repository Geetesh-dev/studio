'use client';

import {
  SmilePlus,
  Smile,
  Meh,
  Frown,
  Angry,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Mood } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MoodTrackerProps {
  mood: Mood;
  setMood: (mood: Mood) => void;
  journal: string;
  setJournal: (journal: string) => void;
}

const moods: { name: Mood; icon: LucideIcon }[] = [
  { name: 'Ecstatic', icon: SmilePlus },
  { name: 'Happy', icon: Smile },
  { name: 'Neutral', icon: Meh },
  { name: 'Sad', icon: Frown },
  { name: 'Anxious', icon: Angry },
];

export default function MoodTracker({ mood, setMood, journal, setJournal }: MoodTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-around p-2 bg-muted rounded-lg">
          {moods.map((m) => (
            <Button
              key={m.name}
              variant="ghost"
              size="icon"
              onClick={() => setMood(m.name)}
              className={cn(
                'w-12 h-12 rounded-full transition-transform transform hover:scale-110',
                mood === m.name
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              )}
              aria-label={m.name}
            >
              <m.icon className="w-6 h-6" />
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="What's on your mind? Write a journal entry..."
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <Button className="w-full">Save Entry</Button>
      </CardContent>
    </Card>
  );
}
