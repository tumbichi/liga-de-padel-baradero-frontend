import Image from "next/image";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

const Logo = ({ width = 80 }) => {
  const imageSrc = useColorModeValue("/logo.svg", "/logo.svg");

  return (
    <Flex alignItems="center">
      <Image priority alt="logo" height={20} src={imageSrc} width={width} />
      <Text fontSize="xl" fontWeight="hairline" mt={2} ml={4}>
        LIGA DE PADEL
      </Text>
    </Flex>
  );
};

export default Logo;
