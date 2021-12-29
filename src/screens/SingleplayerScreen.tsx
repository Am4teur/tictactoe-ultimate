import { Center, Text, Button, Heading } from "native-base";
import { Feather } from "@expo/vector-icons";

const SingleplayerScreen = ({ navigation }: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Center flex={1}>
      <Heading mb="8">Singleplayer Screen</Heading>
      <Button onPress={goBack}>
        <Text color="white">Go Back</Text>
      </Button>
      <Button onPress={() => console.log("test")} variant="unstyled">
        Unstyled
      </Button>
    </Center>
  );
};

export default SingleplayerScreen;
