import { z, ZodObject } from "zod";
import { CYRILLIC_PATTERN, EMOJI_PATTERN } from "@/constants/patterns";

const signInSchema: ZodObject = z
  .object({
    nickname: z
      .string({
        error: "Обязательно для заполнения!",
      })
      .trim()
      .min(3, { error: "Должно быть минимум 3 символа!" })
      .max(30, { error: "Должно быть максимум 30 символов!" }),
    code: z
      .string({
        error: "Обязательно для заполнения!",
      })
      .min(4, { error: "Должно быть минимум 4 символа!" }),
  })
  .superRefine((values, context) => {
    (Object.keys(values) as (keyof typeof values)[]).forEach(field => {
      if (EMOJI_PATTERN.test(values[field])) {
        context.addIssue({
          code: "custom",
          path: [field],
          message: "Эмодзи недопустимы!",
        });
      }

      if (field === "code" && CYRILLIC_PATTERN.test(values[field])) {
        context.addIssue({
          code: "custom",
          path: [field],
          message: "Кириллица недопустима!",
        });
      }
    });
  });

export default signInSchema;
