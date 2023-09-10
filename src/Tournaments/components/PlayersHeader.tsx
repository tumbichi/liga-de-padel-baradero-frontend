import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { useTranslation } from "Base/i18n";

interface TournamentsHeaderProps {
  navigateToCreateTournament: () => void;
}

const TournamentsHeader = ({
  navigateToCreateTournament,
}: TournamentsHeaderProps) => {
  const { t } = useTranslation(["tournaments", "appLayout"]);

  return (
    <Flex justify="space-between">
      <Heading>{t("sidebar.menu.tournaments", { ns: "appLayout" })}</Heading>
      {/* <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateTournament}
      >
        {t("actions.createTournament")}
      </Button> */}
    </Flex>
  );
};

export default TournamentsHeader;
