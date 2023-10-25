import { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, useToast } from "@chakra-ui/react";

import { useTranslation } from "Base/i18n";
import { FormInputText } from "Base/components";

import createPlayerSchema, {
  CreatePlayerSchema,
} from "Players/schemas/CreatePlayerSchema";
import useCreatePlayerService from "Players/data/PlayerRepository/hooks/useCreatePlayerService";
import FormPageLayout from "Base/layout/FormPageLayout";
import FormContainerLayout from "Base/layout/FormContainerLayout";
import FormSectionLayout from "Base/layout/FormSectionLayout";

const CreatePlayer = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatePlayerSchema>({
    resolver: zodResolver(createPlayerSchema),
  });

  const { createPlayer } = useCreatePlayerService();

  const handleCreatePlayer = useCallback(
    (data: CreatePlayerSchema) =>
      createPlayer({
        firstname: data.firstname,
        lastname: data.lastname,
      })
        .then((playerCreated) => {
          reset();
          toast({
            status: "success",
            description: `${playerCreated.firstname} ${playerCreated.lastname} fue registrado en el sistema`,
          });
        })
        .catch((error: Error) => {
          toast({ status: "error", description: error.message });
        }),
    [createPlayer, reset, toast]
  );

  return (
    <FormPageLayout onSubmit={handleSubmit(handleCreatePlayer)}>
      <FormContainerLayout>
        <FormSectionLayout title="Datos del jugador">
          <FormInputText
            isRequired
            /*  errorMessage={
              errors.firstname
                ? (t(`errors.${errors.firstname.message}`, {
                    ns: "common",
                  }) as string) // TODO: Deberia eleminar este casteo: `as string`
                : undefined
            } */
            inputProps={register("firstname")}
            label="Nombre"
            name="firstname"
          />

          <FormInputText
            isRequired
            /* errorMessage={
              errors.lastname
                ? (t(`errors.${errors.lastname.message}`, {
                    ns: "common",
                  }) as string) // TODO: Deberia eleminar este casteo: `as string`
                : undefined
            } */
            inputProps={register("lastname")}
            label={"Apellido"}
            name="lastname"
          />
        </FormSectionLayout>
      </FormContainerLayout>
      <Button
        colorScheme="main"
        isLoading={isSubmitting}
        maxW="container.md"
        mt={16}
        type="submit"
        variant="solid"
      >
        Agregar
      </Button>
    </FormPageLayout>
  );
};

export default CreatePlayer;
