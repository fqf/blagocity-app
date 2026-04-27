import { z, ZodObject } from "zod";

const aboutStep2Schema: ZodObject = z.object({
  disabilityTypes: z.array(z.string()).nonempty({ error: "Вы ничего не выбрали!" }),
});

export default aboutStep2Schema;
