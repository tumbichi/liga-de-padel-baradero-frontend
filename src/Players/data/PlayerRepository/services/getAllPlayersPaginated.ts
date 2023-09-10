import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import playersClient from "../client";
import { PlayersPaginatedReturn } from "../PlayersRepository";

const getAllPlayersPaginated = async (
  page = 1,
  limit = 10,
  query?: string
): Promise<PlayersPaginatedReturn> => {
  let errorMessage: string | undefined;
  try {
    const response = await playersClient.get<PlayersPaginatedReturn>(
      `/pagination?page=${page}&limit=${limit}${query ? `&query=${query}` : ""}`
    );
    return response.data;
  } catch (error) {
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
};

export default getAllPlayersPaginated;
