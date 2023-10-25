import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import tournamentsClient from "../client";

export default async function getTournamentById(tournamentId: string) {
  let errorMessage: string | undefined;

  try {
    const response = await tournamentsClient.get(`/${tournamentId}`);
    return response.data;
  } catch (error) {
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
}
