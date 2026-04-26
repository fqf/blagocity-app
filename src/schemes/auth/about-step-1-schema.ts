import { z, ZodObject } from "zod";
import dayjs from "dayjs";

const aboutStep1Schema: ZodObject = z.object({
  avatar: z.coerce.number(),
  gender: z.string({ error: "Обязательно для выбора!" }),
  dob: z
    .string({ error: "Обязательно для заполнения!" })
    .transform(value => {
      const d = value.split(".");
      return `${d[2]}-${d[1]}-${d[0]}`;
    })
    .pipe(z.iso.date({ error: "Значение должно быть датой!" }))
    .transform(value => dayjs(value, "YYYY-MM-DD").toDate())
    .pipe(z.date().max(dayjs().subtract(18, "year").toDate(), "Вы слишком молоды!")),
});

export default aboutStep1Schema;
