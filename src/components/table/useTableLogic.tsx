import { useReducer, useCallback } from "react";

export const useTableState = (initialState, searchParams, navigate) => {
  const [inputValue, setInputValue] = useReducer(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const handleSearch = useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    const inputStringify = JSON.stringify(inputValue);
    if (
      (searchParams.size == 0 && inputValue.page == "1") ||
      (searchParams.size == 0 && inputValue.perPage == "10") ||
      (searchParams.size == 0 && inputValue.query == "")
    ) {
      return;
    }
    if (inputValue.query || inputValue.perPage || inputValue.page) {
      newParams.set("search", inputStringify);
    } else {
      newParams.delete("search");
    }

    navigate(`?${newParams}`, { replace: true });
  }, [inputValue, searchParams, navigate]);

  return { inputValue, setInputValue, handleSearch };
};
