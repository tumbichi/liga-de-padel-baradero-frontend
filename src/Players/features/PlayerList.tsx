import { DataTable } from "Base/components";
import useAllPlayersPaginated from "Players/data/PlayerRepository/hooks/useAllPeoplePaginated";

interface Player {
  firstname: string;
  lastname: string;
}

const columns = [
  {
    label: "Nombre",
    selector: (row: Player) => row.firstname,
  },
  {
    label: "Apellido",
    selector: (row: Player) => row.lastname,
  },
];

function PlayerList() {
  const {playersList} = useAllPlayersPaginated();

  return (
    <DataTable
      columns={columns}
      data={playersList}
    />
  );
}

export default PlayerList;
