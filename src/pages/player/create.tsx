import { Heading } from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";
import PageLayout from "Base/layout/PageLayout";
import CreatePlayer from "Players/features/CreatePlayer";

function PlayerCreatePage() {
  const { t } = useTranslation("players");

  return (
    <PageLayout>
      {{
        header: (
          <Heading mx="auto" w={{ md: "container.md" }}>
            {t("create.title")}
          </Heading>
        ),
        content: <CreatePlayer />,
      }}
    </PageLayout>
  );
}

export default PlayerCreatePage;
