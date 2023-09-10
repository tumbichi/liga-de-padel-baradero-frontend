import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import TournamentsRepository from "../TournamentsRepository";

const useAddScoreToMatchService = () => {
  const repository = useMemo(
    () => TournamentsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { addScoreToMatch: repository.addScoreToMatch };
};

export default useAddScoreToMatchService;
