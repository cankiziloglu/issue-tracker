import { z } from 'zod';

export const IssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 char')
    .max(255, 'Title must contain at most 255 chars'),
  description: z.string().min(1, 'Description must contain at least 1 char'),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title must contain at least 1 char')
    .max(255, 'Title must contain at most 255 chars')
    .optional(),
  description: z
    .string()
    .min(1, 'Description must contain at least 1 char')
    .max(65535)
    .optional(),
  assignedToId: z
    .string()
    .min(1, 'Assigned to must contain at least 1 char')
    .max(255)
    .optional()
    .nullable(),
});
