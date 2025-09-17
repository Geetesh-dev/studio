'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { getRecipeSuggestion, type RecipeSuggestionOutput } from '@/ai/flows/ai-powered-recipe-suggestions';
import { useToast } from '@/hooks/use-toast';
import type { Mood, HormoneLevels } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface RecipeSuggestionsProps {
  mood: Mood;
  hormones: HormoneLevels;
}

export default function RecipeSuggestions({ mood, hormones }: RecipeSuggestionsProps) {
  const [recipe, setRecipe] = useState<RecipeSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const placeholderImage = PlaceHolderImages[0];

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
    setRecipe(null);
    try {
      const result = await getRecipeSuggestion({
        mood: mood || 'Neutral',
        hormoneLevels: hormones,
        dietaryRestrictions: [],
        availableIngredients: [],
      });
      setRecipe(result);
    } catch (error) {
      console.error('Recipe generation error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to generate recipe.',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">AI-Powered Recipe</CardTitle>
        <CardDescription>Get a recipe suggestion tailored to your current state.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        {isLoading && <RecipeSkeleton />}
        {recipe && (
          <div className="space-y-4">
             <div className="overflow-hidden rounded-lg">
              <Image
                src={placeholderImage.imageUrl}
                alt={recipe.recipeName}
                width={600}
                height={400}
                data-ai-hint={placeholderImage.imageHint}
                className="w-full h-auto object-cover"
              />
            </div>
            <h3 className="font-headline text-xl">{recipe.recipeName}</h3>
            <p className="text-sm text-muted-foreground">{recipe.reasoning}</p>
            <div>
              <h4 className="font-bold">Ingredients:</h4>
              <ul className="list-disc list-inside text-sm">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Instructions:</h4>
              <p className="text-sm whitespace-pre-wrap">{recipe.instructions}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateRecipe} disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Suggest a Recipe'}
        </Button>
      </CardFooter>
    </Card>
  );
}

const RecipeSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <div className="space-y-2 pt-4">
            <Skeleton className="w-1/4 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-full h-4" />
        </div>
    </div>
)
