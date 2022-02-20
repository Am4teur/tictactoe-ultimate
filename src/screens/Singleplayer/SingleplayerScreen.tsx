import React from "react";
import { Heading, Box, Stack } from "native-base";
import ScreenWrapper from "../../components/ScreenWrapper";
import TTTGame from "../../components/TTTGame/TTTGame";
import GoBack from "../../components/GoBack";
import { Mark } from "../../types/Mark";

interface SingleplayerProps {
  navigation: any;
  route: any;
}

const SingleplayerScreen = ({ navigation, route }: SingleplayerProps) => {
  const options = route.params;

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
          />
        </Box>
        <GoBack navigation={navigation} />
      </Stack>
    </ScreenWrapper>
  );
};

export default SingleplayerScreen;
