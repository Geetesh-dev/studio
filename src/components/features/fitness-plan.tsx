'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { personalizedFitnessPlan } from '@/ai/flows/personalized-fitness-plan';
import { useToast } from '@/hooks/use-toast';
import type { Mood, HormoneLevels } from '@/lib/types';

interface FitnessPlanProps {
  mood: Mood;
  hormones: HormoneLevels;
}

export default function FitnessPlan({ mood, hormones }: FitnessPlanProps) {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setPlan(null);
    try {
      const result = await personalizedFitnessPlan({
        mood: mood || 'Neutral',
        hormoneLevels: hormones,
        sleepDuration: 7.5,
        stressLevel: 'medium',
      });
      setPlan(result.fitnessPlan);
    } catch (error) {
      console.error('Fitness plan generation error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to generate fitness plan.',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Today's Fitness Suggestion</CardTitle>
        <CardDescription>Movement tailored to your mood.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        {isLoading && <PlanSkeleton />}
        {plan && <div className="text-sm whitespace-pre-wrap">{plan}</div>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGeneratePlan} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Suggest a Workout'}
        </Button>
      </CardFooter>
    </Card>
  );
}

const PlanSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
        <div className="space-y-2 pt-4">
            <Skeleton className="w-1/2 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
        </div>
    </div>
)
