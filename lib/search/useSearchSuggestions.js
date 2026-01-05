"use client";

import { useEffect, useState } from "react";

export function useSearchSuggestions(query) {
  const [data, setData] = useState({ cities: [], localities: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setData({ cities: [], localities: [] });
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/search/suggestions?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 250);

    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [query]);

  return { ...data, loading };
}
