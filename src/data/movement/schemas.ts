import { z } from "zod";

export const movementDto = z.object({
  id: z.number(),
  amount: z.number(),
  title: z.string(),
  description: z.string().optional().nullable(),
  currency: z.enum(["ARS", "USD"]),
  category: z
    .object({
      id: z.number(),
      name: z.string()
    })
    .optional()
    .nullable(),
  date: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const movementDtoArray = z.array(movementDto);
