import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import tournamentsClient from "../client";
import { Match, Place } from "../TournamentsRepository";

export default async function updateDateAndPlaceToMatch(
  date: Date,
  place: Place,
  matchId: number
) {
  let errorMessage: string | undefined;

  try {
    const response = await tournamentsClient.patch<Match>(
      `/match/update-date-and-place/${matchId}`,
      {
        date: date.toISOString(),
        place,
      }
    );
    return response.data;
  } catch (error) {
    console.log("error :>> ", error);
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
}
