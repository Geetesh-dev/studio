'use server';

/**
 * @fileOverview This file defines the personalized self-care plan generation flow.
 *
 * It takes into account the user's mood, hormone levels, and stress indicators to create tailored recommendations.
 *
 * - generateSelfCarePlan - A function that generates a personalized self-care plan.
 * - SelfCarePlanInput - The input type for the generateSelfCarePlan function.
 * - SelfCarePlanOutput - The return type for the generateSelfCarePlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelfCarePlanInputSchema = z.object({
  mood: z
    .string()
    .describe('The user\'s current mood (e.g., happy, sad, stressed).'),
  cortisolLevel: z
    .string()
    .describe('The user\'s cortisol level (e.g., high, normal, low).'),
  melatoninLevel: z
    .string()
    .describe('The user\'s melatonin level (e.g., high, normal, low).'),
  dopamineLevel: z
    .string()
    .describe('The user\'s dopamine level (e.g., high, normal, low).'),
  serotoninLevel: z
    .string()
    .describe('The user\'s serotonin level (e.g., high, normal, low).'),
  stressLevel: z
    .string()
    .describe('The user\'s stress level (e.g., high, medium, low).'),
});
export type SelfCarePlanInput = z.infer<typeof SelfCarePlanInputSchema>;

const SelfCarePlanOutputSchema = z.object({
  selfCarePlan: z.string().describe('A personalized self-care plan.'),
});
export type SelfCarePlanOutput = z.infer<typeof SelfCarePlanOutputSchema>;

export async function generateSelfCarePlan(
  input: SelfCarePlanInput
): Promise<SelfCarePlanOutput> {
  return selfCarePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selfCarePlanPrompt',
  input: {schema: SelfCarePlanInputSchema},
  output: {schema: SelfCarePlanOutputSchema},
  prompt: `Based on the user's current mood, hormone levels, and stress indicators, generate a personalized daily self-care plan.

Mood: {{{mood}}}
Cortisol Level: {{{cortisolLevel}}}
Melatonin Level: {{{melatoninLevel}}}
Dopamine Level: {{{dopamineLevel}}}
Serotonin Level: {{{serotoninLevel}}}
Stress Level: {{{stressLevel}}}

Consider incorporating activities such as meditation, exercise, healthy eating, and spending time in nature.
Ensure the recommendations are tailored to address the user's specific needs and promote overall well-being.`,
});

const selfCarePlanFlow = ai.defineFlow(
  {
    name: 'selfCarePlanFlow',
    inputSchema: SelfCarePlanInputSchema,
    outputSchema: SelfCarePlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
