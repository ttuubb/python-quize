'use server';

import { generateHint, type GenerateHintInput } from '@/ai/flows/generate-hint';
import { generateQuestion } from '@/ai/flows/generate-question-flow';
import { QuizQuestionInputSchema, type Question, type QuizQuestionInput } from '@/lib/types';
import { z } from 'zod';

const getHintInputSchema = z.object({
  questionText: z.string(),
  category: z.string(),
});

export async function getAIHint(input: GenerateHintInput): Promise<string> {
  const parsedInput = getHintInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return 'Invalid input for generating hint.';
  }

  try {
    const result = await generateHint(parsedInput.data);
    return result.hint;
  } catch (error) {
    console.error('Error generating hint:', error);
    return "Sorry, I couldn't generate a hint right now. Please try again later.";
  }
}

export async function getAIQuestion(input: QuizQuestionInput): Promise<Question> {
  const parsedInput = QuizQuestionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    throw new Error('Invalid input for generating question.');
  }
  
  try {
    const question = await generateQuestion(parsedInput.data);
    return question;
  } catch (error) {
    console.error('Error generating question:', error);
    throw new Error("Sorry, I couldn't generate a question right now. Please try again later.");
  }
}
