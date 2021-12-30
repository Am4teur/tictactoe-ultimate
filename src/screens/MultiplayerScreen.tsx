import React from "react";
import { Heading } from "native-base";
import ScreenWrapper from "../components/ScreenWrapper";
import GoBack from "../components/GoBack";

const MultiplayerScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      <Heading mb="8">Multiplayer Screen</Heading>
      <GoBack navigation={navigation} />
    </ScreenWrapper>
  );
};

export default MultiplayerScreen;
