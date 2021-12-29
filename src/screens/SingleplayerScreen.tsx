import { Center, Text, Button, Heading, Box, Stack } from "native-base";
import { Feather } from "@expo/vector-icons";
import ScreenWrapper from "../components/ScreenWrapper";
import TTTGame from "../components/TTTGame/TTTGame";

const SingleplayerScreen = ({ navigation }: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading my="4">Singleplayer Screen</Heading>
        <Box flex={1} justifyContent="center">
          <TTTGame />
        </Box>
        <Button onPress={goBack} my="4">
          <Text>Go Back</Text>
        </Button>
      </Stack>
    </ScreenWrapper>
  );
};

export default SingleplayerScreen;
