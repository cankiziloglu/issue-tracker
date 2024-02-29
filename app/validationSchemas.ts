import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 char')
    .max(255, 'Title must contain at most 255 chars'),
  description: z.string().min(1, 'Description must contain at least 1 char'),
});
