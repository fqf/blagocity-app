import { z, ZodObject } from "zod";

const signInSchema: ZodObject = z.object({
  nickname: z
    .string({
      error: "Обязательно для заполнения!",
    })
    .trim()
    .min(3, { error: "Должно быть минимум 3 символа!" })
    .max(30, { error: "Должно быть максимум 30 символов!" }),
  code: z.string({
    error: "Обязательно для заполнения!",
  }),
});

export default signInSchema;
