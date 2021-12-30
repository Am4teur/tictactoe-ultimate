import React from "react";
import { Heading, Box, Stack } from "native-base";
import ScreenWrapper from "../components/ScreenWrapper";
import TTTGame from "../components/TTTGame/TTTGame";
import GoBack from "../components/GoBack";

const SingleplayerScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading my="4">Singleplayer Screen</Heading>
        <Box flex={1} justifyContent="center">
          <TTTGame />
        </Box>
        <GoBack navigation={navigation} />
      </Stack>
    </ScreenWrapper>
  );
};

export default SingleplayerScreen;
