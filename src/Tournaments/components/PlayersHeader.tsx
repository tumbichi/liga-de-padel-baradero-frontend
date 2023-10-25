import { Flex, Heading } from "@chakra-ui/react";

/* interface TournamentsHeaderProps {
  navigateToCreateTournament?: () => void;
} */

const TournamentsHeader = () => (
  <Flex justify="space-between">
    <Heading>Torneos</Heading>
    {/* <Button
        leftIcon={<Icon as={PlusIcon} />}
        variant="outline"
        onClick={navigateToCreateTournament}
      >
        {t("actions.createTournament")}
      </Button> */}
  </Flex>
);

export default TournamentsHeader;
