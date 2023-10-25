import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";

import FetchActionTypes from "Base/types/FetchActionTypes";
import PaginationMeta from "Base/types/PaginationMetadata";
import useDebounce from "Base/utils/hooks/useDebounce";

import PlayersRepository from "../PlayersRepository";
import listPlayersReducer, {
  initialState,
} from "../reducers/listPeopleReducer";

const useAllPlayersPaginated = () => {
  const [query, setQuery] = useState<string>("");
  const debouncedInputValue = useDebounce(query, 500);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => PlayersRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: playersList, loading, error }, dispatch] = useReducer(
    listPlayersReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllPlayersPaginated(currentPage, 50, debouncedInputValue)
        .then((data) => {
          dispatch({ type: FetchActionTypes.Succeess, payload: data.data });
          setMeta(data.meta);
        })
        .catch((e) => {
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
        });
    }
  }, [
    invalidated,
    currentPage,
    meta?.itemsPerPage,
    repository,
    debouncedInputValue,
  ]);

  useEffect(() => {
    if (invalidated) {
      setInvalidateCache(false);
    }
  }, [invalidated]);

  return {
    playersList,
    meta,
    loading,
    error,
    invalidateCache,
    currentPage,
    setCurrentPage,
    setQuery,
  };
};

export default useAllPlayersPaginated;
