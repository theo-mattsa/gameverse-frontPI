"use client";
import { handleApiError } from "@/lib/utils/api-error";
import { useState } from "react";

export function useApi<T = any>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  async function execute(apiCall: () => Promise<T>) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  function reset() {
    setIsLoading(false);
    setError(null);
    setData(null);
  }

  return {
    isLoading,
    error,
    data,
    execute,
    reset,
  };
}
