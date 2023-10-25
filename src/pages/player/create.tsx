import { Heading } from "@chakra-ui/react";
import PageLayout from "Base/layout/PageLayout";
import CreatePlayer from "Players/features/CreatePlayer";

function PlayerCreatePage() {
  return (
    <PageLayout>
      {{
        header: (
          <Heading mx="auto" w={{ md: "container.md" }}>
            Agregar nuevo jugador
          </Heading>
        ),
        content: <CreatePlayer />,
      }}
    </PageLayout>
  );
}

export default PlayerCreatePage;
