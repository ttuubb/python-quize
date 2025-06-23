import { z } from 'zod';

export const QuizQuestionInputSchema = z.object({
  category: z.string().describe('The category for the quiz question (e.g., Data Structures, Algorithms).'),
});
export type QuizQuestionInput = z.infer<typeof QuizQuestionInputSchema>;

export const QuizQuestionSchema = z.object({
  category: z.string().describe('The category of the question.'),
  question: z.string().describe('The question text.'),
  code: z.string().optional().describe('An optional code snippet relevant to the question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four multiple-choice options.'),
  answer: z.string().describe('The correct answer, which must be one of the provided options.'),
  explanation: z.string().describe('A detailed explanation of the correct answer.'),
});
export type Question = z.infer<typeof QuizQuestionSchema>;
