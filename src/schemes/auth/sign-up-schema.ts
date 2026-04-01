import { z, ZodObject } from "zod";

const signUpSchema: ZodObject = z
  .object({
    nickname: z
      .string({
        error: "Обязательно для заполнения!",
      })
      .trim(),
    code: z.string({
      error: "Обязательно для заполнения!",
    }),
    code2: z.string({
      error: "Обязательно для заполнения!",
    }),
  })
  .refine(({ code, code2 }) => code === code2, {
    message: "Коды не совпадают!",
    path: ["code2"],
  });

export default signUpSchema;
