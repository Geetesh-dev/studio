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
import { generateSelfCarePlan } from '@/ai/flows/personalized-self-care-plans';
import { useToast } from '@/hooks/use-toast';
import type { Mood, HormoneLevels } from '@/lib/types';

interface SelfCarePlanProps {
  mood: Mood;
  hormones: HormoneLevels;
}

const toHormoneLevelCategory = (level: number): string => {
  if (level > 70) return 'high';
  if (level < 30) return 'low';
  return 'normal';
};

export default function SelfCarePlan({ mood, hormones }: SelfCarePlanProps) {
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setPlan(null);
    try {
      const result = await generateSelfCarePlan({
        mood: mood || 'Neutral',
        cortisolLevel: toHormoneLevelCategory(hormones.cortisol),
        melatoninLevel: toHormoneLevelCategory(hormones.melatonin),
        dopamineLevel: toHormoneLevelCategory(hormones.dopamine),
        serotoninLevel: toHormoneLevelCategory(hormones.serotonin),
        stressLevel: toHormoneLevelCategory(hormones.cortisol),
      });
      setPlan(result.selfCarePlan);
    } catch (error) {
      console.error('Self-care plan generation error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to generate plan.',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Personalized Self-Care</CardTitle>
        <CardDescription>A plan for today, just for you.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        {isLoading && <PlanSkeleton />}
        {plan && <div className="text-sm whitespace-pre-wrap">{plan}</div>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGeneratePlan} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Create My Plan'}
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
