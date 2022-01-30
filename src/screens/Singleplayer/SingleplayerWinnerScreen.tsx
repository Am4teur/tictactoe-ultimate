import { Box, Heading, Stack } from "native-base";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import DisplayWinner from "../../components/TTTGame/DisplayWinner";
import { getPlayerColor } from "../../components/TTTGame/TTTGame";

interface SingleplayerWinnerProps {
  navigation: any;
  route: any;
}

const SingleplayerWinner = ({ navigation, route }: SingleplayerWinnerProps) => {
  const { winner } = route.params;

  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Box flex={1} justifyContent="center">
          {winner ? (
            <DisplayWinner winner={winner} color={getPlayerColor(winner)} />
          ) : null}
        </Box>
      </Stack>
    </ScreenWrapper>
  );
};

export default SingleplayerWinner;
