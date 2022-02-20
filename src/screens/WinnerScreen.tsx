import { Box, Heading, Stack } from "native-base";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import DisplayWinner from "../components/TTTGame/DisplayWinner";
import { getMarkColor } from "../components/TTTGame/TTTGame";

interface WinnerScreenProps {
  navigation: any;
  route: any;
}

const WinnerScreen = ({ navigation, route }: WinnerScreenProps) => {
  const { winner } = route.params;

  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Box flex={1} justifyContent="center">
          {winner ? (
            <DisplayWinner winner={winner} color={getMarkColor(winner)} />
          ) : null}
        </Box>
      </Stack>
    </ScreenWrapper>
  );
};

export default WinnerScreen;
