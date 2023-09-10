import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import TournamentsRepository from "../TournamentsRepository";

const useCreateMatchService = () => {
  const repository = useMemo(
    () => TournamentsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { createMatch: repository.createMatch };
};

export default useCreateMatchService;
