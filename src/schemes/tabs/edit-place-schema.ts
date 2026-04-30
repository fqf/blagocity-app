import { z, ZodObject } from "zod";

const editPlaceSchema: ZodObject = z.object({
  name: z
    .string({
      error: "Обязательно для заполнения!",
    })
    .trim()
    .min(3, { error: "Должно быть минимум 3 символа!" })
    .max(30, { error: "Должно быть максимум 30 символов!" }),
  type: z.string({
    error: "Вы ничего не выбрали!",
  }),
  accessibility: z.array(z.string()).nonempty({ error: "Вы ничего не выбрали!" }),
});

export default editPlaceSchema;
