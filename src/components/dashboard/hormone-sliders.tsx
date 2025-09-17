'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import type { Hormone, HormoneLevels } from '@/lib/types';

interface HormoneSlidersProps {
  hormones: HormoneLevels;
  setHormones: (hormones: HormoneLevels) => void;
}

const hormoneInfo: Record<Hormone, { label: string; color: string }> = {
  cortisol: { label: 'Cortisol (Stress)', color: 'bg-red-400' },
  melatonin: { label: 'Melatonin (Sleep)', color: 'bg-indigo-400' },
  dopamine: { label: 'Dopamine (Motivation)', color: 'bg-amber-400' },
  serotonin: { label: 'Serotonin (Mood)', color: 'bg-sky-400' },
};

export default function HormoneSliders({ hormones, setHormones }: HormoneSlidersProps) {
  const handleSliderChange = (hormone: Hormone, value: number[]) => {
    setHormones({ ...hormones, [hormone]: value[0] });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Hormone Levels</CardTitle>
        <CardDescription>Adjust sliders to reflect your current state.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {(Object.keys(hormones) as Hormone[]).map((key) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={key}>{hormoneInfo[key].label}</Label>
              <span className="text-sm font-medium w-10 text-right">{hormones[key]}%</span>
            </div>
            <Slider
              id={key}
              value={[hormones[key]]}
              onValueChange={(value) => handleSliderChange(key, value)}
              max={100}
              step={1}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
