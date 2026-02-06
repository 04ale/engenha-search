import type { EngineerInput } from "@/lib/validation/engenheiro";

export interface AcervoItemProps {
  id: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  categoria?: string;
}

export interface EngineerProps extends EngineerInput {
  id: string;
  nome: string;
  crea: string;
  avatar_url: string;
  acervo_itens?: AcervoItemProps[];
  locais_atuacao?: {
    uf: string;
    cidades: string[];
  }[];
}

export type CreateEngineerInput = EngineerInput;
export type UpdateEngineerInput = Partial<EngineerInput>;
