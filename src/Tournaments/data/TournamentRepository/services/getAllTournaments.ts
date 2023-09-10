import handleAxiosError from "Base/utils/handlers/handleAxiosError";
import tournamentsClient from "../client";
import { Tournament } from "../TournamentsRepository";

export default async function getAllTournaments() {
  let errorMessage: string | undefined;

  try {
    const response = await tournamentsClient.get<Tournament[]>("/");
    return response.data;
  } catch (error) {
    errorMessage = handleAxiosError(error);
  }

  throw new Error(errorMessage);
}
