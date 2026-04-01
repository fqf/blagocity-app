import { z, ZodObject } from "zod";

const signInSchema: ZodObject = z.object({
  nickname: z
    .string({
      error: "Обязательно для заполнения!",
    })
    .trim(),
  code: z.string({
    error: "Обязательно для заполнения!",
  }),
});

export default signInSchema;
