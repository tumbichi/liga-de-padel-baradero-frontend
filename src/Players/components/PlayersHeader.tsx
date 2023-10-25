import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Shared/i18n";

interface PlayersHeaderProps {
  navigateToCreatePlayer: () => void;
}

const PlayersHeader = ({ navigateToCreatePlayer }: PlayersHeaderProps) => (
  <Flex justify="space-between">
    <Heading>Jugadores</Heading>
    <Button
      leftIcon={<Icon as={PlusIcon} />}
      variant="outline"
      onClick={navigateToCreatePlayer}
    >
      Agregar jugador
    </Button>
  </Flex>
);

export default PlayersHeader;
