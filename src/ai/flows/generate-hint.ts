// src/ai/flows/generate-hint.ts
'use server';
/**
 * @fileOverview A flow to generate hints for quiz questions using AI.
 *
 * - generateHint - A function that generates a hint for a given quiz question.
 * - GenerateHintInput - The input type for the generateHint function.
 * - GenerateHintOutput - The return type for the generateHint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  category: z.string().describe('The category of the quiz question (e.g., Data Structures, Algorithms).'),
});
export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('A contextual, non-revealing hint for the quiz question.'),
});
export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHintPrompt',
  input: {schema: GenerateHintInputSchema},
  output: {schema: GenerateHintOutputSchema},
  prompt: `You are an AI-powered quiz assistant. Your task is to provide helpful, non-revealing hints for quiz questions.

  Question Category: {{{category}}}
  Question: {{{questionText}}}

  Generate a hint that guides the user towards the solution without giving away the answer directly. The hint should point to a relevant concept, suggest a problem-solving strategy, or remind the user of a common pitfall. Be concise and avoid being overly verbose.
  `,
});

const generateHintFlow = ai.defineFlow(
  {
    name: 'generateHintFlow',
    inputSchema: GenerateHintInputSchema,
    outputSchema: GenerateHintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
