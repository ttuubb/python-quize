'use server';
/**
 * @fileOverview A flow to generate a new quiz question using AI.
 *
 * - generateQuestion - A function that generates a quiz question.
 * - QuizQuestionInput - The input type for the generateQuestion function.
 * - Question - The return type for the generateQuestion function.
 */

import {ai} from '@/ai/genkit';
import {
  type Question,
  type QuizQuestionInput,
  QuizQuestionInputSchema,
  QuizQuestionSchema,
} from '@/lib/types';

export async function generateQuestion(
  input: QuizQuestionInput
): Promise<Question> {
  return generateQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionPrompt',
  input: {schema: QuizQuestionInputSchema},
  output: {schema: QuizQuestionSchema},
  prompt: `You are an expert Python programming tutor. Your task is to generate a multiple-choice quiz question in Chinese based on a given category.

You must generate one question with the following properties:
- A clear and concise question text.
- An optional code snippet if relevant to the question.
- Four multiple-choice options. One of them must be the correct answer. The other three should be plausible but incorrect distractors.
- The correct answer, which must exactly match one of the four options.
- A detailed explanation for why the correct answer is right.

The entire response, including all fields in the output schema, must be in Chinese.

Category: {{{category}}}

Generate a question now.`,
});

const generateQuestionFlow = ai.defineFlow(
  {
    name: 'generateQuestionFlow',
    inputSchema: QuizQuestionInputSchema,
    outputSchema: QuizQuestionSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
