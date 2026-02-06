import { z } from "zod";

export const EngineerSchema = z.object({
  id: z.string(),
  nome: z.string(),
  crea: z.string(),
  avatar_url: z.string(),
});

export type EngineerInput = z.infer<typeof EngineerSchema>;
