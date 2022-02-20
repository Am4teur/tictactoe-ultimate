import React from "react";
import { Heading, Box, Stack } from "native-base";
import ThemeToggle from "../components/ThemeToggle";
import ScreenWrapper from "../components/ScreenWrapper";
import GoBack from "../components/GoBack";

const SettingsScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading my="4">Settings</Heading>
        <Box flex={1} justifyContent="center">
          <Box py="5">
            <ThemeToggle />
          </Box>
        </Box>
        <GoBack navigation={navigation} />
      </Stack>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
