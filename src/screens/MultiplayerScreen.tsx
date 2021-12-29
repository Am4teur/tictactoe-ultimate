import { Center, Text, Button, Heading } from "native-base";
import { Feather } from "@expo/vector-icons";
import ScreenWrapper from "../components/ScreenWrapper";

const MultiplayerScreen = ({ navigation }: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <ScreenWrapper>
      <Heading mb="8">Multiplayer Screen</Heading>
      <Button onPress={goBack}>
        <Text color="white">Go Back</Text>
      </Button>
    </ScreenWrapper>
  );
};

export default MultiplayerScreen;
