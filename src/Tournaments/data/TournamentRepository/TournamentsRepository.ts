import { Player } from "Players/data/PlayerRepository/PlayersRepository";
import tournamentsClient from "./client";

import addScoreToMatch from "./services/addScoreToMatch";
import getAllTournaments from "./services/getAllTournaments";
import getTournamentById from "./services/getTournamentById";
import createMatch from "./services/createMatch";
import updateDateAndPlaceToMatch from "./services/updateDateAndPlaceToMatch";

export type Place = "SOCIAL" | "GATO";

export interface Set {
  id: number;
  gamesTeam1: number;
  gamesTeam2: number;
}

export interface Score {
  sets: Set[];
}

export interface Match {
  id: number;
  couple1: Player[];
  couple2: Player[];
  date: Date | null;
  place: Place | null;
  score: Score | null;
}

export interface Round {
  description: string;
  matches: Match[];
  id: number;
}

export interface Tournament {
  description: string;
  beginsAt: Date;
  endsAt: Date;
  rounds: Round[];
  players: Player[];
  id: string;
}

interface ITournamentsRepository {
  addScoreToMatch: (
    sets: Omit<Set, "id">[],
    winners: number[],
    lossers: number[],
    matchId: number
  ) => Promise<Match>;
  getAllTournaments: () => Promise<Tournament[]>;
  getTournamentById: (tournamentId: string) => Promise<Tournament>;
  createMatch: (
    couple1Ids: number[],
    couple2Ids: number[],
    roundId: number
  ) => Promise<Match>;
  updateDateAndPlaceToMatch: (
    date: Date,
    place: Place,
    matchId: number
  ) => Promise<Match>;
}

const TournamentsRepository = (userToken: string): ITournamentsRepository => {
  tournamentsClient.defaults.headers.common = {
    Authorization: `Bearer ${userToken}`,
  };

  return {
    addScoreToMatch,
    getAllTournaments,
    getTournamentById,
    createMatch,
    updateDateAndPlaceToMatch,
  };
};

export default TournamentsRepository;
