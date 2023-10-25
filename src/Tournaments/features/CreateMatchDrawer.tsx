import { useCallback, useMemo, useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Heading,
  DrawerFooter,
  Button,
  useToast,
} from "@chakra-ui/react";

import { FormSelect } from "Base/components";
import { Player } from "Players/data/PlayerRepository/PlayersRepository";
import useCreateMatchService from "Tournaments/data/TournamentRepository/hooks/useCreateMatchService";
import {
  Match,
  Round,
} from "Tournaments/data/TournamentRepository/TournamentsRepository";

interface CreateMatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchCreated: (match: Match) => void;
  tournamentPlayerWithoutMatch: Player[];
  round: Round & { index: number };
}

const CreateMatchDrawer = ({
  isOpen,
  tournamentPlayerWithoutMatch,
  round: roundSelected,
  onClose,
  onMatchCreated,
}: CreateMatchDrawerProps) => {
  const toast = useToast();

  const { createMatch } = useCreateMatchService();

  const [isLoading, setLoading] = useState(false);

  const [player1, setPlayer1] = useState<Player | undefined>();
  const [player2, setPlayer2] = useState<Player | undefined>();
  const [player3, setPlayer3] = useState<Player | undefined>();
  const [player4, setPlayer4] = useState<Player | undefined>();

  const player1Options = useMemo(
    () =>
      tournamentPlayerWithoutMatch
        .map((player) => ({
          label: `${player.firstname} ${player.lastname}`,
          value: player,
        }))
        .filter(
          (item) =>
            item.value.id !== player2?.id &&
            item.value.id !== player3?.id &&
            item.value.id !== player4?.id
        ),
    [player2?.id, player3?.id, player4?.id, tournamentPlayerWithoutMatch]
  );

  const player2Options = useMemo(
    () =>
      tournamentPlayerWithoutMatch
        .map((player) => ({
          label: `${player.firstname} ${player.lastname}`,
          value: player,
        }))
        .filter(
          (item) =>
            item.value.id !== player1?.id &&
            item.value.id !== player3?.id &&
            item.value.id !== player4?.id
        ),
    [player1?.id, player3?.id, player4?.id, tournamentPlayerWithoutMatch]
  );

  const player3Options = useMemo(
    () =>
      tournamentPlayerWithoutMatch
        .map((player) => ({
          label: `${player.firstname} ${player.lastname}`,
          value: player,
        }))
        .filter(
          (item) =>
            item.value.id !== player2?.id &&
            item.value.id !== player1?.id &&
            item.value.id !== player4?.id
        ),
    [player1?.id, player2?.id, player4?.id, tournamentPlayerWithoutMatch]
  );

  const player4Options = useMemo(
    () =>
      tournamentPlayerWithoutMatch
        .map((player) => ({
          label: `${player.firstname} ${player.lastname}`,
          value: player,
        }))
        .filter(
          (item) =>
            item.value.id !== player2?.id &&
            item.value.id !== player3?.id &&
            item.value.id !== player1?.id
        ),
    [player1?.id, player2?.id, player3?.id, tournamentPlayerWithoutMatch]
  );

  const closeDrawer = useCallback(() => {
    onClose();
    setPlayer1(undefined);
    setPlayer2(undefined);
    setPlayer3(undefined);
    setPlayer4(undefined);
  }, [onClose]);

  const handleCreateMatch = useCallback(() => {
    if (player1 && player2 && player3 && player4) {
      setLoading(true);
      createMatch(
        [player1.id, player2.id],
        [player3.id, player4.id],
        roundSelected.id
      )
        .then((matchCreated) => {
          onMatchCreated(matchCreated);
          toast({ status: "success", title: "Partido creado" });
          closeDrawer();
        })
        .catch(() =>
          toast({ status: "error", title: "Error al crear nuevo partido" })
        )
        .finally(() => setLoading(false));
    } else {
      toast({ status: "warning", title: "Tenes que elegir 4 jugadores" });
    }
  }, [
    closeDrawer,
    createMatch,
    onMatchCreated,
    player1,
    player2,
    player3,
    player4,
    roundSelected?.id,
    toast,
  ]);

  return (
    <Drawer isOpen={isOpen} size="sm" onClose={closeDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="2xl">
          Nuevo Partido de {roundSelected?.description}
        </DrawerHeader>
        <DrawerBody>
          <Box mt={2}>
            <Heading mb={4} size="md">
              Pareja 1
            </Heading>
            <FormSelect
              label="Seleccionar jugador 1"
              options={player1Options}
              onChange={(itemSelected: any) => {
                setPlayer1(itemSelected.value);
              }}
            />
            <Box mt={2}>
              <FormSelect
                label="Seleccionar jugador 2"
                options={player2Options}
                onChange={(itemSelected: any) => {
                  setPlayer2(itemSelected.value);
                }}
              />
            </Box>
          </Box>
          <Box mt={8}>
            <Heading size="md" mb={4}>
              Pareja 2
            </Heading>
            <FormSelect
              label="Seleccionar jugador 1"
              options={player3Options}
              onChange={(itemSelected: any) => {
                setPlayer3(itemSelected.value);
              }}
            />
            <Box mt={2}>
              <FormSelect
                label="Seleccionar jugador 2"
                options={player4Options}
                onChange={(itemSelected: any) => {
                  setPlayer4(itemSelected.value);
                }}
              />
            </Box>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme="main"
            isLoading={isLoading}
            w="full"
            onClick={handleCreateMatch}
          >
            Listo
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateMatchDrawer;
