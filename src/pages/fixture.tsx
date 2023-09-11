import {
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Loading } from "Base/components";
import PageLayout from "Base/layout/PageLayout";
import RoundSection from "Tournaments/components/RoundSection";
import { Tournament } from "Tournaments/data/TournamentRepository/TournamentsRepository";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FixturePage = () => {
  const [data, setData] = useState<Tournament | undefined>();
  const [loading, setLoading] = useState(true);

  const { toggleColorMode } = useColorMode();
  const ColorModeIcon = useColorModeValue(SunIcon, MoonIcon);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<Tournament>(
          `${process.env.NEXT_PUBLIC_API_URL}/tournament/470d7491-84e8-4db5-bf44-d4e7af6ed160`
        );
        setData(response.data);
      } catch (error) {
        console.log("error :>> ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <Center h="100vh">
      <Loading />
    </Center>
  ) : (
    <PageLayout>
      {{
        header: (
          <Flex justifyContent="space-between" mt={6}>
            <Heading>Fixture</Heading>
            <IconButton
              aria-label="dark mode"
              icon={<Icon as={ColorModeIcon} />}
              variant="ghost"
              onClick={toggleColorMode}
            />
          </Flex>
        ),
        content: data ? <RoundSection round={data.rounds[0]} /> : null,
      }}
    </PageLayout>
  );
};

export default FixturePage;
