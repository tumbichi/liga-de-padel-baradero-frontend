import { useCallback, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  DrawerFooter,
  Button,
  Flex,
  Text,
  Heading,
  Stack,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  Match,
  Set,
} from "Tournaments/data/TournamentRepository/TournamentsRepository";
import { FormRadioGroup } from "Base/components";
import useAddScoreToMatchService from "Tournaments/data/TournamentRepository/hooks/useAddScoreToMatchService";

const validateSet = (
  sets: Partial<Omit<Set, "id">>[]
): { validSets: Omit<Set, "id">[]; isValid: boolean } => {
  const validSets: Omit<Set, "id">[] = [];
  let isValid = true;

  sets.forEach((set) => {
    if (
      typeof set.gamesTeam1 === "number" &&
      typeof set.gamesTeam2 === "number"
    ) {
      validSets.push({
        gamesTeam1: set.gamesTeam1,
        gamesTeam2: set.gamesTeam2,
      });
    } else {
      isValid = false; // Retorna false si un set es inválido
    }
  });

  return { isValid, validSets };
};

interface AddScoreDrawerProps {
  isOpen: boolean;
  match: Match;
  onClose: () => void;
  onScoreAdded: (match: Match) => void;
}
const AddScoreDrawer = ({
  isOpen,
  match,
  onClose,
  onScoreAdded,
}: AddScoreDrawerProps) => {
  const toast = useToast();
  const { addScoreToMatch } = useAddScoreToMatchService();
  const borderColor = useColorModeValue("black", "white");
  const [isLoading, setLoading] = useState(false);
  const [setsInput, setSetsInput] = useState<Partial<Omit<Set, "id">>[]>([
    { gamesTeam1: undefined, gamesTeam2: undefined },
    { gamesTeam1: undefined, gamesTeam2: undefined },
    { gamesTeam1: undefined, gamesTeam2: undefined },
  ]);
  const [coupleSelected, setCoupleSelected] = useState<string | undefined>(
    undefined
  );

  const closeDrawer = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleAddScoreDrawer = () => {
    const { isValid, validSets } = validateSet(setsInput);
    if (coupleSelected !== undefined && isValid) {
      setLoading(true);

      const winners =
        coupleSelected === "1"
          ? [match.couple1[0].id, match.couple1[1].id]
          : [match.couple2[0].id, match.couple2[1].id];

      const lossers =
        coupleSelected === "2"
          ? [match.couple2[0].id, match.couple2[1].id]
          : [match.couple1[0].id, match.couple1[1].id];

      addScoreToMatch(validSets, winners, lossers, match.id)
        .then((matchUpdated) => {
          onScoreAdded(matchUpdated);
          closeDrawer();
          toast({ status: "success", title: "Resultado agregado" });
        })
        .catch((error) => {
          toast({ status: "error", title: "Error al agrgar resultado" });
        })
        .finally(() => setLoading(false));
    } else {
      toast({
        status: "warning",
        title: "Resultado invalido",
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} size="sm" onClose={closeDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="2xl">Agregar hora y fecha</DrawerHeader>
        <DrawerBody>
          <Flex alignItems="center" gap={4}>
            <Box>
              <Heading mb={2} size="xs">
                Pareja 1
              </Heading>
              <Text>
                {match.couple1[0].firstname} {match.couple1[0].lastname}
              </Text>
              <Text>
                {match.couple1[1].firstname} {match.couple1[1].lastname}
              </Text>
            </Box>
            <Text fontWeight="800">VS</Text>
            <Box>
              <Heading mb={2} size="xs">
                Pareja 2
              </Heading>
              <Text>
                {match.couple2[0].firstname} {match.couple2[0].lastname}
              </Text>
              <Text>
                {match.couple2[1].firstname} {match.couple2[1].lastname}
              </Text>
            </Box>
          </Flex>

          <Flex
            borderTopColor={borderColor}
            borderTopStyle="solid"
            borderTopWidth={1}
            gap={6}
            mt={4}
            pt={4}
          >
            <Stack justifyContent="flex-end" spacing={6} mb={2}>
              <Box>
                <Text fontSize="lg" fontWeight={500}>
                  Pareja 1
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight={500}>
                  Pareja 2
                </Text>
              </Box>
            </Stack>

            <Stack direction={"row"} gap={4}>
              {[1, 2, 3].map((set, setIndex) => (
                <Flex key={`set-${set}`}>
                  <Stack spacing={4}>
                    <Text fontSize="xs" textAlign="center">
                      Set {set}
                    </Text>
                    <Box>
                      <Input
                        maxW={12}
                        type="number"
                        value={setsInput[setIndex].gamesTeam1}
                        onChange={(event) =>
                          setSetsInput((prev) =>
                            prev.map((s, sIdx) =>
                              setIndex === sIdx
                                ? {
                                    ...s,
                                    gamesTeam1: parseInt(
                                      event.target.value,
                                      10
                                    ),
                                  }
                                : s
                            )
                          )
                        }
                      />
                    </Box>
                    <Box>
                      <Input
                        maxW={12}
                        type="number"
                        value={setsInput[setIndex].gamesTeam2}
                        onChange={(event) =>
                          setSetsInput((prev) =>
                            prev.map((s, sIdx) =>
                              setIndex === sIdx
                                ? {
                                    ...s,
                                    gamesTeam2: parseInt(
                                      event.target.value,
                                      10
                                    ),
                                  }
                                : s
                            )
                          )
                        }
                      />
                    </Box>
                  </Stack>
                </Flex>
              ))}
            </Stack>
          </Flex>

          <Flex
            borderTopColor={borderColor}
            borderTopStyle="solid"
            borderTopWidth={1}
            gap={6}
            mt={4}
            pt={4}
          >
            <FormRadioGroup
              label={"¿Quien gano?"}
              radioItems={[
                {
                  label: "Pareja 1",
                  value: "1",
                },
                {
                  label: "Pareja 2",
                  value: "2",
                },
              ]}
              selected={coupleSelected}
              onChange={setCoupleSelected}
            />
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme="main"
            isLoading={isLoading}
            w="full"
            onClick={handleAddScoreDrawer}
          >
            Listo
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddScoreDrawer;
