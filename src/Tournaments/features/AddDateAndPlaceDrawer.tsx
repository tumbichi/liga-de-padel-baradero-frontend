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
  FormControl,
  FormLabel,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  Match,
  Place,
} from "Tournaments/data/TournamentRepository/TournamentsRepository";
import { FormSelect } from "Base/components";
import { placeOptions } from "Tournaments/data/Place/places";
import useUpdateDateAndPlaceToMatchService from "Tournaments/data/TournamentRepository/hooks/useUpdateDateAndPlaceToMatchService";

interface AddDateAndPlaceDrawerProps {
  isOpen: boolean;
  match: Match;
  onClose: () => void;
  onMatchUpdated: (match: Match) => void;
}
const AddDateAndPlaceDrawer = ({
  isOpen,
  match,
  onClose,
  onMatchUpdated,
}: AddDateAndPlaceDrawerProps) => {
  const toast = useToast();
  const { updateDateAndPlaceToMatch } = useUpdateDateAndPlaceToMatchService();
  const borderColor = useColorModeValue("black", "white");
  const [isLoading, setLoading] = useState(false);
  const [date, setDate] = useState<string | undefined>();
  const [place, setPlace] = useState<Place | undefined>();

  const closeDrawer = useCallback(() => {
    setDate(undefined);
    setPlace(undefined);
    onClose();
  }, [onClose]);

  const handleAddDateAndPlaceDrawer = () => {
    if (date && place) {
      setLoading(true);
      updateDateAndPlaceToMatch(new Date(date), place, match.id)
        .then((matchUpdated) => {
          console.log("matchUpdated :>> ", matchUpdated);
          onMatchUpdated(matchUpdated);
          closeDrawer();
          toast({ status: "success", title: "Partido actualizado" });
        })
        .catch((error) => {
          toast({ status: "error", title: "Error al actualizar partido" });
        })
        .finally(() => setLoading(false));
    } else {
      toast({
        status: "warning",
        title: "Tenes que seleccionar una fecha y un lugar",
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
          <Heading my={3} size="md">
            Fixture
          </Heading>
          <Flex alignItems="center" gap={4}>
            <Box>
              <Text>
                {match.players[0].firstname} {match.players[0].lastname}
              </Text>
              <Text>
                {match.players[1].firstname} {match.players[1].lastname}
              </Text>
            </Box>
            <Text fontWeight="800">VS</Text>
            <Box>
              <Text>
                {match.players[2].firstname} {match.players[2].lastname}
              </Text>
              <Text>
                {match.players[3].firstname} {match.players[3].lastname}
              </Text>
            </Box>
          </Flex>

          <Box
            borderTopColor={borderColor}
            borderTopStyle="solid"
            borderTopWidth={1}
            mt={6}
          >
            <Stack mt={4}>
              <FormControl>
                <FormLabel>Horario</FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormSelect
                  label={"Lugar"}
                  options={placeOptions}
                  onChange={(selected: any) => setPlace(selected?.value)}
                />
              </FormControl>
            </Stack>
          </Box>
        </DrawerBody>
        <DrawerFooter>
          <Button
            colorScheme="main"
            isLoading={isLoading}
            w="full"
            onClick={handleAddDateAndPlaceDrawer}
          >
            Listo
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddDateAndPlaceDrawer;
