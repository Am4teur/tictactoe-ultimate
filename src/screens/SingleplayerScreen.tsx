import React from "react";
import { Heading, Box, Stack } from "native-base";
import ScreenWrapper from "../components/ScreenWrapper";
import TTTGame from "../components/TTTGame/TTTGame";
import GoBack from "../components/GoBack";

interface SingleplayerProps {
  navigation: any;
  route: any;
}

const SingleplayerScreen = ({ navigation, route }: SingleplayerProps) => {
  const { state } = route.params;

  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading my="4">Singleplayer {state} Screen </Heading>
        <Box flex={1} justifyContent="center">
          <TTTGame />
        </Box>
        <GoBack navigation={navigation} />
      </Stack>
    </ScreenWrapper>
  );
};

export default SingleplayerScreen;
