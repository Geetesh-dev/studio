// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview AI-powered recipe suggestion flow.
 *
 * This file defines a Genkit flow that suggests personalized, AI-generated healthy recipes based on user data.
 *
 * @exports {
 *   getRecipeSuggestion: (input: RecipeSuggestionInput) => Promise<RecipeSuggestionOutput>;
 *   RecipeSuggestionInput: z.infer<typeof RecipeSuggestionInputSchema>;
 *   RecipeSuggestionOutput: z.infer<typeof RecipeSuggestionOutputSchema>;
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeSuggestionInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
  hormoneLevels: z
    .record(z.string(), z.number())
    .describe('A map of hormone names to their levels.'),
  dietaryRestrictions: z
    .array(z.string())
    .describe('A list of dietary restrictions for the user.'),
  availableIngredients: z
    .array(z.string())
    .describe('A list of ingredients the user has available.'),
});
export type RecipeSuggestionInput = z.infer<typeof RecipeSuggestionInputSchema>;

const RecipeSuggestionOutputSchema = z.object({
  recipeName: z.string().describe('The name of the suggested recipe.'),
  ingredients: z.array(z.string()).describe('The ingredients required for the recipe.'),
  instructions: z.string().describe('The instructions for preparing the recipe.'),
  nutritionInformation: z
    .record(z.string(), z.string())
    .describe('A map of nutrition information (e.g., calories, protein) to their values.'),
  reasoning: z
    .string()
    .describe(
      'A short explanation of why this recipe was selected based on the input parameters.'
    ),
});
export type RecipeSuggestionOutput = z.infer<typeof RecipeSuggestionOutputSchema>;

export async function getRecipeSuggestion(
  input: RecipeSuggestionInput
): Promise<RecipeSuggestionOutput> {
  return recipeSuggestionFlow(input);
}

const recipeSuggestionPrompt = ai.definePrompt({
  name: 'recipeSuggestionPrompt',
  input: {schema: RecipeSuggestionInputSchema},
  output: {schema: RecipeSuggestionOutputSchema},
  prompt: `You are an AI recipe assistant that suggests personalized, healthy recipes based on user data.

  Consider the user's current mood, hormone levels, dietary restrictions, and available ingredients to create a suitable recipe suggestion.

  Mood: {{{mood}}}
  Hormone Levels: {{#each hormoneLevels}}{{{@key}}}: {{{this}}}
  {{/each}}
  Dietary Restrictions: {{#each dietaryRestrictions}}{{{this}}}{{/each}}
  Available Ingredients: {{#each availableIngredients}}{{{this}}}{{/each}}

  Suggest a recipe that is healthy, easy to prepare, and aligns with the user's needs. Explain your reasoning for the recipe you chose.

  Format the nutritionInformation as JSON.
  Include recipe name, ingredients, instructions and nutrition information in the output.
  Make sure ingredients and instructions are easy to follow.
  `,
});

const recipeSuggestionFlow = ai.defineFlow(
  {
    name: 'recipeSuggestionFlow',
    inputSchema: RecipeSuggestionInputSchema,
    outputSchema: RecipeSuggestionOutputSchema,
  },
  async input => {
    const {output} = await recipeSuggestionPrompt(input);
    return output!;
  }
);
