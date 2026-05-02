import { z, ZodObject } from "zod";

const editReviewSchema: ZodObject = z.object({
  rating: z.number().min(1, { error: "Необходимо поставить оценку!" }),
  review: z
    .string({ error: "Обязательно для заполнения!" })
    .trim()
    .min(10, { error: "Должно быть минимум 10 символа!" })
    .max(100, { error: "Должно быть максимум 100 символов!" }),
});

export default editReviewSchema;
