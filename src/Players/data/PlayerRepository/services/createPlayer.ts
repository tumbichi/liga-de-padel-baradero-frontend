import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import playersClient from "../client";
import { CreatePlayerDto, Player } from "../PlayersRepository";

const createPlayer = async (body: CreatePlayerDto): Promise<Player> => {
  let errorMessage: string | undefined;
  try {
    const response = await playersClient.post<Player>("/create", body);
    return response.data;
  } catch (error) {
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
};

export default createPlayer;
