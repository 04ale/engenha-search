import { supabase } from "@/lib/supabase/client";
import { useState, useEffect, useCallback } from "react";
import type { EngineerProps } from "@/types/engenheiro";

export function useEngenheiros(
  query?: string,
  filters?: { ufs?: string[]; cidades?: string[] },
) {
  const [engenheiros, setEngenheiros] = useState<EngineerProps[]>([]);
  const [engineer, setEngineer] = useState<EngineerProps | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEngenheiros = useCallback(async () => {
    try {
      setLoading(true);

      const isUUID =
        query &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
          query,
        );

      let queryBuilder = supabase
        .from("engenheiros")
        .select("id, nome, crea, avatar_url, acervo_itens(*)")
        .eq("is_public", true);

      if (isUUID) {
        // Fetch single engineer logic
        const { data, error } = await supabase
          .from("engenheiros")
          .select("*, acervo_itens(*)")
          .eq("id", query)
          .single();

        if (error) {
          console.error("Erro ao buscar engenheiro:", error);
        } else if (data) {
          setEngineer(data as EngineerProps);
          setEngenheiros([]); // Clear list when fetching single
        }
      } else {
        // Fetch list logic
        if (query) {
          queryBuilder = queryBuilder.ilike("nome", `%${query}%`);
        }

        // Apply Location Filters (Multi-Select OR Logic)
        const orConditions: string[] = [];

        // If specific cities are selected, filter by them
        if (filters?.cidades && filters.cidades.length > 0) {
          filters.cidades.forEach((cidade) => {
            // Check if locales contains an entry with this city in its 'cidades' array
            orConditions.push(`locais_atuacao.cs.[{"cidades": ["${cidade}"]}]`);
          });
        }
        // Only valid if no cities selected? Or additive?
        // User request: "filtering by state and city". Usually if I select State SP and City Santos, I want Santos.
        // If I select State SP and RJ, I want all from SP and RJ.
        // If I select State SP and City Rio (RJ), I want SP OR Rio.
        // Let's combine all selected UFs and Cities into one big OR for maximum flexibility,
        // but typically if a city is selected for a UF, we might prioritize that.
        // For simple "OR" logic:
        else if (filters?.ufs && filters.ufs.length > 0) {
          filters.ufs.forEach((uf) => {
            orConditions.push(`locais_atuacao.cs.[{"uf": "${uf}"}]`);
          });
        }

        if (orConditions.length > 0) {
          queryBuilder = queryBuilder.or(orConditions.join(","));
        }

        const { data, error } = await queryBuilder;

        if (error) {
          console.error("Erro ao buscar engenheiros:", error);
        } else if (data) {
          setEngenheiros(data as EngineerProps[]);
          setEngineer(null); // Clear single when fetching list
        }
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    } finally {
      setLoading(false);
    }
  }, [query, JSON.stringify(filters?.ufs), JSON.stringify(filters?.cidades)]);

  useEffect(() => {
    fetchEngenheiros();
  }, [fetchEngenheiros]);

  return { engenheiros, engineer, loading, fetchEngenheiros };
}

export default useEngenheiros;
