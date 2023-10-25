import PaginationMeta from "Base/types/PaginationMetadata";
import playerClient from "./client";

import createPlayer from "./services/createPlayer";
import getAllPlayersPaginated from "./services/getAllPlayersPaginated";

export interface Player {
  firstname: string;
  lastname: string;
  id: number;
}

export interface PlayersPaginatedReturn {
  data: Player[];
  meta: PaginationMeta;
}

export type CreatePlayerDto = Omit<Player, "id">;

interface IPlayersRepository {
  createPlayer: (player: CreatePlayerDto) => Promise<Player>;
  getAllPlayersPaginated: (
    page?: number,
    limit?: number,
    query?: string
  ) => Promise<PlayersPaginatedReturn>;
}

const PlayersRepository = (userToken: string): IPlayersRepository => {
  playerClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    createPlayer,
    getAllPlayersPaginated,
    // updatePlayer,
    // deletePlayer,
    // getAllPlayers,
    // getPlayerById,
  };
};

export default PlayersRepository;
