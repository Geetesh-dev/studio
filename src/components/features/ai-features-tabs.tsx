'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import RecipeSuggestions from './recipe-suggestions';
import SelfCarePlan from './self-care-plan';
import FitnessPlan from './fitness-plan';
import type { Mood, HormoneLevels } from '@/lib/types';

interface AiFeaturesTabsProps {
  mood: Mood;
  hormones: HormoneLevels;
}

export default function AiFeaturesTabs({ mood, hormones }: AiFeaturesTabsProps) {
  return (
    <Tabs defaultValue="recipes">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="recipes">Recipes</TabsTrigger>
        <TabsTrigger value="self-care">Self-Care</TabsTrigger>
        <TabsTrigger value="fitness">Fitness</TabsTrigger>
      </TabsList>
      <TabsContent value="recipes">
        <RecipeSuggestions mood={mood} hormones={hormones} />
      </TabsContent>
      <TabsContent value="self-care">
        <SelfCarePlan mood={mood} hormones={hormones} />
      </TabsContent>
      <TabsContent value="fitness">
        <FitnessPlan mood={mood} hormones={hormones} />
      </TabsContent>
    </Tabs>
  );
}
