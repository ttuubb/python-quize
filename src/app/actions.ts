'use server';

import { generateHint, type GenerateHintInput } from '@/ai/flows/generate-hint';
import { z } from 'zod';

const inputSchema = z.object({
  questionText: z.string(),
  category: z.string(),
});

export async function getAIHint(input: GenerateHintInput): Promise<string> {
  const parsedInput = inputSchema.safeParse(input);
  if (!parsedInput.success) {
    return 'Invalid input for generating hint.';
  }

  try {
    const result = await generateHint(parsedInput.data);
    return result.hint;
  } catch (error) {
    console.error('Error generating hint:', error);
    return 'Sorry, I couldn\'t generate a hint right now. Please try again later.';
  }
}
