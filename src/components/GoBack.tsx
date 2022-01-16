import React from "react";
import { Feather } from "@expo/vector-icons";
import { Text, Button, HStack, useColorModeValue } from "native-base";

const GoBack = ({ navigation }: any) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <Button my="4" onPress={goBack} shadow="5">
      <HStack alignItems="center">
        <Feather
          name="arrow-left"
          size={26}
          color={useColorModeValue("black", "white")}
        />
        <Text fontSize="xl" fontWeight="medium" pl="2">
          Go Back
        </Text>
      </HStack>
    </Button>
  );
};

export default GoBack;
