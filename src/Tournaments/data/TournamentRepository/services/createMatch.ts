import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import tournamentsClient from "../client";
import { Match } from "../TournamentsRepository";

export default async function createMatch(
  couple1Ids: number[],
  couple2Ids: number[],
  roundId: number
) {
  let errorMessage: string | undefined;

  try {
    const response = await tournamentsClient.post<Match>("/match/create", {
      couple1Ids,
      couple2Ids,
      roundId,
    });
    return response.data;
  } catch (error) {
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
}
