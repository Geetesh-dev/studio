'use client';

import { useState } from 'react';
import type { Mood, HormoneLevels } from '@/lib/types';

import MoodTracker from '@/components/dashboard/mood-tracker';
import HormoneSliders from '@/components/dashboard/hormone-sliders';
import CorrelationChart from '@/components/dashboard/correlation-chart';
import AiChatCompanion from '@/components/features/ai-chat-companion';
import AiFeaturesTabs from '@/components/features/ai-features-tabs';

export default function Dashboard() {
  const [mood, setMood] = useState<Mood>('Neutral');
  const [journal, setJournal] = useState('');
  const [hormones, setHormones] = useState<HormoneLevels>({
    cortisol: 55,
    melatonin: 60,
    dopamine: 45,
    serotonin: 50,
  });

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <MoodTracker mood={mood} setMood={setMood} journal={journal} setJournal={setJournal} />
          <HormoneSliders hormones={hormones} setHormones={setHormones} />
          <CorrelationChart hormones={hormones} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6">
          <AiChatCompanion mood={mood} hormones={hormones} />
          <AiFeaturesTabs mood={mood} hormones={hormones} />
        </div>
      </div>
    </main>
  );
}
