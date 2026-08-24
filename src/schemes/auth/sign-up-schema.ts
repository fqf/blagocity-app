import { z, ZodObject } from "zod";
import { CYRILLIC_PATTERN, EMOJI_PATTERN } from "@/constants/patterns";

const signUpSchema: ZodObject = z
  .object({
    nickname: z
      .string({
        error: "Обязательно для заполнения!",
      })
      .trim()
      .min(3, { error: "Должно быть минимум 3 символа!" }),
    code: z
      .string({
        error: "Обязательно для заполнения!",
      })
      .min(4, { error: "Должно быть минимум 4 символа!" }),
    code2: z
      .string({
        error: "Обязательно для заполнения!",
      })
      .min(4, { error: "Должно быть минимум 4 символа!" }),
  })
  .refine(({ code, code2 }) => code === code2, {
    message: "Коды не совпадают!",
    path: ["code2"],
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

      if ((field === "code" || field === "code2") && CYRILLIC_PATTERN.test(values[field])) {
        context.addIssue({
          code: "custom",
          path: [field],
          message: "Кириллица недопустима!",
        });
      }
    });
  });

export default signUpSchema;
