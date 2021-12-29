import { Center, Text, Button, Heading, Box, Stack } from "native-base";
import { Feather } from "@expo/vector-icons";
import ThemeToggle from "../components/ThemeToggle";
import ScreenWrapper from "../components/ScreenWrapper";

const SettingsScreen = ({ navigation }: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading my="4">Settings Screen</Heading>
        <Box flex={1} justifyContent="center">
          <Box py="5">
            <ThemeToggle />
          </Box>
        </Box>
        <Button onPress={goBack} my="4">
          <Text>Go Back</Text>
        </Button>
      </Stack>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
