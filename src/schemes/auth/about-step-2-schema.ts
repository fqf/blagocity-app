import { z, ZodObject } from "zod";

const aboutStep2Schema: ZodObject = z.object({
  features: z.array(z.number()).nonempty({ error: "Вы ничего не выбрали!" }),
});

export default aboutStep2Schema;
