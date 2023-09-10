import { z } from "zod";

const createPlayerSchema = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
});

export type CreatePlayerSchema = z.infer<typeof createPlayerSchema>;

export default createPlayerSchema;
