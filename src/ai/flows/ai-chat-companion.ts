'use server';

/**
 * @fileOverview This file defines the AI chat companion flow for the MindMates app.
 *
 * It includes:
 * - aiChatCompanionFlow: The Genkit flow definition for the chat companion.
 * - AIChatCompanionInput: The input type for the aiChatCompanionFlow.
 * - AIChatCompanionOutput: The output type for the aiChatCompanionFlow.
 * - aiChatCompanion: An async function that wraps the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatCompanionInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
  hormoneData: z
    .object({
      cortisol: z.number().describe('Cortisol level of the user.'),
      melatonin: z.number().describe('Melatonin level of the user.'),
      dopamine: z.number().describe('Dopamine level of the user.'),
      serotonin: z.number().describe('Serotonin level of the user.'),
    })
    .describe('The hormone data of the user.'),
  userInput: z.string().describe('The user input to the chat companion.'),
});
export type AIChatCompanionInput = z.infer<typeof AIChatCompanionInputSchema>;

const AIChatCompanionOutputSchema = z.object({
  response: z.string().describe('The response from the AI chat companion.'),
});
export type AIChatCompanionOutput = z.infer<typeof AIChatCompanionOutputSchema>;

export async function aiChatCompanion(input: AIChatCompanionInput): Promise<AIChatCompanionOutput> {
  return aiChatCompanionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatCompanionPrompt',
  input: {schema: AIChatCompanionInputSchema},
  output: {schema: AIChatCompanionOutputSchema},
  prompt: `You are an empathetic and supportive AI chat companion designed to help users with their mental wellness. Your responses should be tailored to the user's current mood and hormone data.

Current Mood: {{{mood}}}
Hormone Data: Cortisol: {{{hormoneData.cortisol}}}, Melatonin: {{{hormoneData.melatonin}}}, Dopamine: {{{hormoneData.dopamine}}}, Serotonin: {{{hormoneData.serotonin}}}

User Input: {{{userInput}}}

Respond in a way that encourages healthy habits and provides stress relief. Offer suggestions for meditation, breathing exercises, or mindfulness activities as appropriate. Be empathetic and understanding.
`,
});

const aiChatCompanionFlow = ai.defineFlow(
  {
    name: 'aiChatCompanionFlow',
    inputSchema: AIChatCompanionInputSchema,
    outputSchema: AIChatCompanionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
