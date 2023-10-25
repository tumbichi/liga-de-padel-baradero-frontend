import { DataTable } from "Base/components";
import formatDatetime from "Base/utils/formatters/formatDatetime";
import { Tournament } from "Tournaments/data/TournamentRepository/TournamentsRepository";
import useTournamentsList from "Tournaments/data/TournamentRepository/hooks/useTournamentsList";

interface TournamentListProps {
  navigateToTournamentDetails: (tournamentId: string) => void;
}

const TournamentList = ({
  navigateToTournamentDetails,
}: TournamentListProps) => {
  const { tournamentsList, loading } = useTournamentsList();

  const handleItemClick = (row: Tournament) => {
    navigateToTournamentDetails(row.id);
  };

  return (
    <DataTable
      columns={[
        {
          label: "Torneo",
          selector: (tournament: Tournament) => tournament.description,
        },
        {
          label: "Fecha de Inicio",
          selector: (tournament: Tournament) =>
            formatDatetime(tournament.beginsAt),
        },
        {
          label: "Fecha estimada de fin",
          selector: (tournament: Tournament) =>
            formatDatetime(tournament.endsAt),
        },
        {
          label: "Rondas",
          selector: (tournament: Tournament) => tournament.rounds.length,
        },
      ]}
      data={tournamentsList}
      loading={loading}
      onClickRow={handleItemClick}
    />
  );
};

export default TournamentList;
