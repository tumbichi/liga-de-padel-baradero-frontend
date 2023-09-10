import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

// import { useTranslation } from "Shared/i18n";

interface PlayersHeaderProps {
  navigateToCreatePlayer: () => void;
}

const PlayersHeader = ({ navigateToCreatePlayer }: PlayersHeaderProps) => {
  const { t } = useTranslation(["players", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.players", { ns: "appLayout" })}</Heading>
      <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreatePlayer}
      >
        {t("actions.createPerson")}
      </Button>
    </Flex>
  );
};

export default PlayersHeader;
