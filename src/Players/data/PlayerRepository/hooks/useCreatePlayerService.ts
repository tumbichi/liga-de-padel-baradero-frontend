
import { TokenHandler } from "@kushitech/auth-module";
import { useMemo } from "react";

import PlayersRepository from "../PlayersRepository";

const useCreatePlayerService = () => {
  const repository = useMemo(
    () => PlayersRepository(TokenHandler.getTokenFromCookies() || ""),
    []
  );

  return { createPlayer: repository.createPlayer };
};

export default useCreatePlayerService;
