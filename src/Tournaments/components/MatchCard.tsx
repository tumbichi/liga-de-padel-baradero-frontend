import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CalendarDaysIcon, SquaresPlusIcon } from "@heroicons/react/24/outline";

import formatDatetime from "Base/utils/formatters/formatDatetime";

import { Match } from "Tournaments/data/TournamentRepository/TournamentsRepository";
import { places } from "Tournaments/data/Place/places";

interface MatchCardProps {
  match: Match;
  index: number;
  onAddDateAndPlace: (match: Match) => void;
  onAddScore: (match: Match) => void;
}

const MatchCard = ({
  match,
  index,
  onAddDateAndPlace,
  onAddScore,
}: MatchCardProps) => {
  const borderColor = useColorModeValue("black", "white");

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Partido {index + 1}</Heading>
      </CardHeader>
      <CardBody>
        <Flex alignItems="center" gap={4}>
          <Box>
            <Heading size="xs" mb={2}>
              Pareja 1
            </Heading>
            <Text>
              {match.players[0].firstname} {match.players[0].lastname}
            </Text>
            <Text>
              {match.players[1].firstname} {match.players[1].lastname}
            </Text>
          </Box>
          <Text fontWeight="800">VS</Text>
          <Box>
            <Heading size="xs" mb={2}>
              Pareja 2
            </Heading>
            <Text>
              {match.players[2].firstname} {match.players[2].lastname}
            </Text>
            <Text>
              {match.players[3].firstname} {match.players[3].lastname}
            </Text>
          </Box>
        </Flex>

        {match.place && match.date ? (
          <>
            <Stack
              borderTop={`1px ${borderColor} solid`}
              mt={4}
              pt={4}
              spacing={1}
            >
              <Flex justifyContent="space-between" w="full">
                <Text>Lugar: </Text>
                <Text fontWeight="semibold">{places[match.place]}</Text>
              </Flex>
              <Flex justifyContent="space-between" w="full">
                <Text>Horario: </Text>
                <Text fontWeight="semibold">{formatDatetime(match.date)}</Text>
              </Flex>
            </Stack>
            {match.score ? (
              <Flex
                borderTop={`1px ${borderColor} solid`}
                justifyContent="space-between"
                mt={4}
                pt={4}
              >
                <Stack justifyContent="flex-end" spacing={1}>
                  <Box>
                    <Text fontWeight={500} fontSize="lg">
                      Pareja 1
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight={500} fontSize="lg">
                      Pareja 2
                    </Text>
                  </Box>
                </Stack>

                <Stack direction={"row"} gap={6}>
                  {match.score.sets.map((set, setIndex) => (
                    <Flex key={`set-${set.id}`}>
                      <Stack spacing={1}>
                        <Text fontSize="xs">Set {setIndex + 1}</Text>
                        <Box>
                          <Text fontSize="lg">{set.gamesTeam1}</Text>
                        </Box>
                        <Box>
                          <Text fontSize="lg">{set.gamesTeam2}</Text>
                        </Box>
                      </Stack>
                    </Flex>
                  ))}
                </Stack>
              </Flex>
            ) : (
              <Center borderTop={`1px ${borderColor} solid`} mt={4} pt={4}>
                <Button
                  colorScheme="main"
                  leftIcon={<Icon as={SquaresPlusIcon} />}
                  variant="outline"
                  w="full"
                  onClick={() => onAddScore(match)}
                >
                  Agregar resultado
                </Button>
              </Center>
            )}
          </>
        ) : (
          <Center borderTop={`1px ${borderColor} solid`} mt={4} pt={4}>
            <Button
              colorScheme="main"
              leftIcon={<Icon as={CalendarDaysIcon} />}
              variant="outline"
              w="full"
              onClick={() => onAddDateAndPlace(match)}
            >
              Agregar horario y lugar
            </Button>
          </Center>
        )}
        {/* {match.place && match.date} */}
      </CardBody>
    </Card>
  );
};

export default MatchCard;