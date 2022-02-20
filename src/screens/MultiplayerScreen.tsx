import React from "react";
import { Box, Heading, Stack } from "native-base";
import ScreenWrapper from "../components/ScreenWrapper";
import GoBack from "../components/GoBack";
import { Mark } from "../types/Mark";
import TTTGame from "../components/TTTGame/TTTGame";
import { CommonActions } from "@react-navigation/native";

interface MultiplayerProps {
  navigation: any;
  route: any;
}

const MultiplayerScreen = ({ navigation, route }: MultiplayerProps) => {
  // const options = route.params;
  const options = {
    playerMark: 0,
    startMark: 0,
    boardDesign: 0,
    playingVsAI: false,
  };

  const navigateToWinnerScreen = (winner: Mark) => {
    navigation.navigate("WinnerScreen", { winner });
  };

  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Box flex={1} justifyContent="center">
          <TTTGame
            options={options}
            navToWinnerScreen={navigateToWinnerScreen}
            navigation={navigation}
          />
        </Box>
        <GoBack navigation={navigation} />
      </Stack>
    </ScreenWrapper>
  );
};

export default MultiplayerScreen;
