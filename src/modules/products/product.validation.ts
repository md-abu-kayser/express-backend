import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.number().positive(),
    stock: z.number().int().min(0),
  }),
});
