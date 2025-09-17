'use server';

/**
 * @fileOverview AI-driven flow to generate personalized fitness plans based on user's mood.
 *
 * - personalizedFitnessPlan - A function that generates a personalized fitness plan based on user's mood.
 * - PersonalizedFitnessPlanInput - The input type for the personalizedFitnessPlan function.
 * - PersonalizedFitnessPlanOutput - The return type for the personalizedFitnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFitnessPlanInputSchema = z.object({
  mood: z
    .string()
    .describe("The user's current mood (e.g., happy, sad, stressed)."),
  hormoneLevels: z.object({
    cortisol: z.number().optional().describe('Cortisol level (optional).'),
    melatonin: z.number().optional().describe('Melatonin level (optional).'),
    dopamine: z.number().optional().describe('Dopamine level (optional).'),
    serotonin: z.number().optional().describe('Serotonin level (optional).'),
  }).optional().describe('Optional hormone levels of the user.'),
  sleepDuration: z.number().optional().describe('Optional sleep duration in hours.'),
  stressLevel: z.string().optional().describe('Optional stress level (e.g., low, medium, high).'),
});

export type PersonalizedFitnessPlanInput = z.infer<
  typeof PersonalizedFitnessPlanInputSchema
>;

const PersonalizedFitnessPlanOutputSchema = z.object({
  fitnessPlan: z.string().describe('A personalized fitness plan based on the user input.'),
});

export type PersonalizedFitnessPlanOutput = z.infer<
  typeof PersonalizedFitnessPlanOutputSchema
>;

export async function personalizedFitnessPlan(
  input: PersonalizedFitnessPlanInput
): Promise<PersonalizedFitnessPlanOutput> {
  return personalizedFitnessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFitnessPlanPrompt',
  input: {schema: PersonalizedFitnessPlanInputSchema},
  output: {schema: PersonalizedFitnessPlanOutputSchema},
  prompt: `Based on the user's current mood, hormone levels, sleep duration and stress level, suggest a personalized fitness plan.

Mood: {{{mood}}}
Hormone Levels: {{#if hormoneLevels}} Cortisol: {{{hormoneLevels.cortisol}}}, Melatonin: {{{hormoneLevels.melatonin}}}, Dopamine: {{{hormoneLevels.dopamine}}}, Serotonin: {{{hormoneLevels.serotonin}}} {{else}} Not provided {{/if}}
Sleep Duration: {{#if sleepDuration}}{{{sleepDuration}}} hours{{else}}Not provided{{/if}}
Stress Level: {{#if stressLevel}}{{{stressLevel}}}{{else}}Not provided{{/if}}

Consider the following when generating the fitness plan:
- For happy moods, suggest energetic activities like running or dancing.
- For sad moods, recommend gentle exercises like yoga or walking.
- For stressed moods, suggest calming activities like meditation or Tai Chi.
- Adapt workout intensity depending on hormone levels, sleep duration and stress level.
`,
});

const personalizedFitnessPlanFlow = ai.defineFlow(
  {
    name: 'personalizedFitnessPlanFlow',
    inputSchema: PersonalizedFitnessPlanInputSchema,
    outputSchema: PersonalizedFitnessPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
