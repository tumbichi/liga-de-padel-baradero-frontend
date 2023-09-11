import { useCallback, useState } from "react";
import { Heading, useDisclosure } from "@chakra-ui/react";
import { withAuth } from "@kushitech/auth-module";

import PageLayout from "Base/layout/PageLayout";

import RoundSection from "Tournaments/components/RoundSection";
import TournamentsRepository, {
  Match,
  Round,
  Tournament,
} from "Tournaments/data/TournamentRepository/TournamentsRepository";
import CreateMatchDrawer from "Tournaments/features/CreateMatchDrawer";
import AddDateAndPlaceDrawer from "Tournaments/features/AddDateAndPlaceDrawer";
import AddScoreDrawer from "Tournaments/features/AddScoreDrawer";

interface TournamentDetailsPageProps {
  tournament: Tournament;
}

const TournamentDetailsPage = ({ tournament }: TournamentDetailsPageProps) => {
  const {
    isOpen: isOpenCreateMatchDrawer,
    onClose: closeCreateMatchDrawer,
    onOpen: openCreateMatchDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenAddAndPlaceDrawer,
    onClose: closeAddAndPlaceDrawer,
    onOpen: openAddAndPlaceDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenAddScoreDrawer,
    onClose: closeAddScoreDrawer,
    onOpen: openAddScoreDrawer,
  } = useDisclosure();
  const [roundSelected, setRoundSelected] = useState<
    (Round & { index: number }) | undefined
  >();
  const [currentTournament, setCurrentTournament] = useState(tournament);
  const [matchSelected, setMatchSelected] = useState<Match | undefined>();

  const tournamentPlayerWithoutMatch = currentTournament.players.filter(
    (player) =>
      !roundSelected?.matches.some(
        (match) =>
          match.couple1.some((matchPlayer) => matchPlayer.id === player.id) ||
          match.couple2.some((matchPlayer) => matchPlayer.id === player.id)
      )
  );

  const handleMatchCreated = useCallback(
    (matchCreated: Match) => {
      if (roundSelected) {
        setCurrentTournament((t) => {
          t.rounds[roundSelected.index].matches.push(matchCreated);
          return {
            ...t,
            rounds: t.rounds,
          };
        });
      }
    },
    [roundSelected]
  );

  const handleMatchUpdated = useCallback((matchUpdated: Match) => {
    setCurrentTournament((prevT) => ({
      ...prevT,
      rounds: prevT.rounds.map((round) =>
        round.matches.some((match) => match.id === matchUpdated.id)
          ? {
              ...round,
              matches: round.matches.map((match) =>
                match.id === matchUpdated.id
                  ? {
                      ...match,
                      date: matchUpdated.date,
                      place: matchUpdated.place,
                    }
                  : match
              ),
            }
          : round
      ),
    }));
  }, []);

  const handleScoreAdded = useCallback((matchUpdated: Match) => {
    setCurrentTournament((prevT) => ({
      ...prevT,
      rounds: prevT.rounds.map((round) =>
        round.matches.some((match) => match.id === matchUpdated.id)
          ? {
              ...round,
              matches: round.matches.map((match) =>
                match.id === matchUpdated.id
                  ? { ...match, score: matchUpdated.score }
                  : match
              ),
            }
          : round
      ),
    }));
  }, []);

  const handleCreateMatchDrawerClose = useCallback(() => {
    setRoundSelected(undefined);
    closeCreateMatchDrawer();
  }, [closeCreateMatchDrawer]);

  return (
    <PageLayout>
      {{
        header: <Heading>{currentTournament.description}</Heading>,
        content: (
          <>
            {currentTournament.rounds.map((round, index) => (
              <RoundSection
                key={round.id}
                round={round}
                onAddDateAndPlace={(match: Match) => {
                  setMatchSelected(match);
                  openAddAndPlaceDrawer();
                }}
                onAddScore={(match: Match) => {
                  setMatchSelected(match);
                  openAddScoreDrawer();
                }}
                onCreateMatch={() => {
                  setRoundSelected({ ...round, index });
                  openCreateMatchDrawer();
                }}
              />
            ))}
            {roundSelected ? (
              <CreateMatchDrawer
                isOpen={isOpenCreateMatchDrawer}
                round={roundSelected}
                tournamentPlayerWithoutMatch={tournamentPlayerWithoutMatch}
                onClose={handleCreateMatchDrawerClose}
                onMatchCreated={handleMatchCreated}
              />
            ) : null}
            {matchSelected ? (
              <AddDateAndPlaceDrawer
                isOpen={isOpenAddAndPlaceDrawer}
                match={matchSelected}
                onClose={closeAddAndPlaceDrawer}
                onMatchUpdated={handleMatchUpdated}
              />
            ) : null}
            {matchSelected ? (
              <AddScoreDrawer
                isOpen={isOpenAddScoreDrawer}
                match={matchSelected}
                onClose={closeAddScoreDrawer}
                onScoreAdded={handleScoreAdded}
              />
            ) : null}
          </>
        ),
      }}
    </PageLayout>
  );
};

export const getServerSideProps = withAuth(async (ctx, user) => {
  if (!ctx.req.cookies.token) {
    // eslint-disable-next-line no-console
    console.log("You dont have permission on  :>> ", ctx.resolvedUrl);
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }

  let tournament;
  const repository = TournamentsRepository(ctx.req.cookies.token);
  const tournmanetId = String(ctx.query.id);

  try {
    tournament = await repository.getTournamentById(tournmanetId);
  } catch (error) {
    tournament = null;
  }

  return {
    props: {
      user,
      tournament,
    },
  };
});

export default TournamentDetailsPage;
