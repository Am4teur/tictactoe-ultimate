import { Box, Heading, Stack } from "native-base";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";

interface SingleplayerWinnerProps {
  navigation: any;
  route: any;
}

const SingleplayerWinner = ({ navigation, route }: SingleplayerWinnerProps) => {
  const { winner } = route.params;

  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading>Singlepayer Winner Screen {winner}</Heading>
        <Box flex={1} justifyContent="center"></Box>
      </Stack>
    </ScreenWrapper>
  );
};

export default SingleplayerWinner;
