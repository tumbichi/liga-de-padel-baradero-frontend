import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import TournamentsRepository from "../TournamentsRepository";

const useUpdateDateAndPlaceToMatchService = () => {
  const repository = useMemo(
    () => TournamentsRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { updateDateAndPlaceToMatch: repository.updateDateAndPlaceToMatch };
};

export default useUpdateDateAndPlaceToMatchService;
