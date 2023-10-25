import { Button, Flex, Heading } from "@chakra-ui/react";
import {
  Match,
  Round,
} from "Tournaments/data/TournamentRepository/TournamentsRepository";
import MatchCard from "./MatchCard";

interface RoundCardProps {
  round: Round;
  onAddDateAndPlace?: (match: Match) => void;
  onAddScore?: (match: Match) => void;
  onCreateMatch?: () => void;
}

const RoundSection = ({
  round,
  onAddDateAndPlace,
  onAddScore,
  onCreateMatch,
}: RoundCardProps) => (
  <>
    <Flex justifyContent="space-between">
      <Heading size="lg">{round.description.replace("Ronda", "Fecha")}</Heading>
      {onCreateMatch && (
        <Button colorScheme="main" onClick={onCreateMatch}>
          Crear partido
        </Button>
      )}
    </Flex>
    <Flex flexWrap="wrap" gap={4}>
      {round.matches.map((match, index) => (
        <MatchCard
          key={`match-${match.id}`}
          index={index}
          match={match}
          onAddDateAndPlace={onAddDateAndPlace}
          onAddScore={onAddScore}
        />
      ))}
    </Flex>
  </>
);

export default RoundSection;
