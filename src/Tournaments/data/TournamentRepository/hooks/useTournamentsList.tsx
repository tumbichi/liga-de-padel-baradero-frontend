import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { TokenHandler } from "@kushitech/auth-module";
import FetchActionTypes from "Base/types/FetchActionTypes";
import TournamentsRepository from "../TournamentsRepository";
import tournamentsListReducer, {
  initialState,
} from "../reducer/tournamentsListReducer";

const useTournamentsList = () => {
  const [invalidated, setInvalidateCache] = useState<boolean | undefined>();

  const repository = useMemo(
    () => TournamentsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );
  const [{ data: tournamentsList, loading, error }, dispatch] = useReducer(
    tournamentsListReducer,
    initialState
  );

  const invalidateCache = useCallback(() => setInvalidateCache(true), []);

  useEffect(() => {
    if (invalidated || invalidated === undefined) {
      dispatch({ type: FetchActionTypes.Start });
      repository
        .getAllTournaments()
        .then((data) => {
          console.log("data :>> ", data);
          dispatch({ type: FetchActionTypes.Succeess, payload: data });
        })
        .catch((e) => {
          console.log("error :>> ", error);
          dispatch({ type: FetchActionTypes.Failure, payload: e.message });
        });
    }
  }, [invalidated, repository]);

  useEffect(() => {
    if (invalidated) {
      setInvalidateCache(false);
    }
  }, [invalidated]);

  return { tournamentsList, loading, error, invalidateCache };
};

export default useTournamentsList;
