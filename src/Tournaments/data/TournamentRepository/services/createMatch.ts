import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import tournamentsClient from "../client";
import { Match } from "../TournamentsRepository";

export default async function createMatch(
  playersIds: number[],
  roundId: number
) {
  let errorMessage: string | undefined;

  try {
    const response = await tournamentsClient.post<Match>("/match/create", {
      playersIds,
      roundId,
    });
    return response.data;
  } catch (error) {
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
}
