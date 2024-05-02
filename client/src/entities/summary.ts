import { ArticleSummarizerFormSchema } from "@/components/ArticleSummarizerForm";
import { Summary } from "@/types";
import { useCallback, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

const baseUrl = "/api/summary";
const filterFn = (key: unknown) => typeof key === "string" && key.startsWith(baseUrl)

export const useSummary = (id: Summary["id"]) => {
  const { data, error, isLoading } = useSWR<Summary>(`${baseUrl}/${id}`);

  return {
    summary: data,
    isLoading,
    isError: error,
  };
};

export const useSummaries = (pageSize = 10) => {
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(
    `${baseUrl}?page=${page}&limit=${pageSize}`
  );
  const isLoading = !data && !error;
  const summaries = (data as Summary[]) || [];

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const fetchPreviousPage = () => {
    setPage(page - 1);
  };

  return {
    summaries,
    isLoading,
    isError: error,
    fetchNextPage,
    fetchPreviousPage,
    mutate,
  };
};

export const useCreateSummary = () => {
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);

  const createSummary = async (summary: ArticleSummarizerFormSchema) => {
    setLoading(true);
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary),
    });
    setLoading(false);
    const data = await response.json();
    mutate(filterFn)
    return data;
  };

  return { createSummary, loading };
};

export const useUpdateSummary = () => {
  const { mutate } = useSWRConfig();

  const updateSummary = useCallback(
    async (id: Summary["id"], summary: Partial<Summary>) => {
      mutate(`${baseUrl}/${id}`, { ...summary }, false);
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summary),
      });
      const updatedSummary = await response.json();
      mutate(`${baseUrl}/${id}`, updatedSummary, true);
      return updatedSummary;
    },
    [mutate]
  );

  return { updateSummary };
};

export const useDeleteSummary = () => {
  const { mutate } = useSWRConfig();

  const deleteSummary = useCallback(
    async (id: number) => {
      mutate(
        filterFn,
        (summaries: Summary[] | undefined) =>
          (summaries ?? []).filter((summary) => summary.id !== id),
      ); // Optimistically update the cache
      await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      mutate(filterFn);
    },
    [mutate]
  );

  return { deleteSummary };
};
