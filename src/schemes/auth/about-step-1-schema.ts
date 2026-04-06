import { z, ZodObject } from "zod";

const aboutStep1Schema: ZodObject = z.object({
  avatar: z.coerce.number(),
  gender: z.string({ error: "Обязательно для выбора!" }),
  age: z.coerce
    .number({
      error: "Обязательно для заполнения!",
    })
    .min(18, { error: "Вы слишком молоды!" }),
});

export default aboutStep1Schema;
