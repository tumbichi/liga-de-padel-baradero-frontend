import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import tournamentsClient from "../client";
import { Match, Set } from "../TournamentsRepository";

export default async function addScoreToMatch(
  sets: Omit<Set, "id">[],
  winners: number[],
  lossers: number[],
  matchId: number
) {
  let errorMessage: string | undefined;

  try {
    const response = await tournamentsClient.patch<Match>(
      `/match/add-score/${matchId}`,
      {
        sets,
        winners,
        lossers,
      }
    );
    return response.data;
  } catch (error) {
    console.log("error :>> ", error);
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
}
