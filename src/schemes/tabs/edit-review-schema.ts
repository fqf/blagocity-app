import { string, z, ZodObject } from "zod";

const editReviewSchema: ZodObject = z.object({
  review: z
    .string()
    .trim()
    .min(10, { error: "Должно быть минимум 10 символа!" })
    .max(100, { error: "Должно быть максимум 100 символов!" })
    .optional(),
  accessibility: z
    .array(
      z.object({
        guid: string(),
        value: z.number(),
      }),
    )
    .nonempty({ error: "Вы ничего не указали!" }),
});

export default editReviewSchema;
