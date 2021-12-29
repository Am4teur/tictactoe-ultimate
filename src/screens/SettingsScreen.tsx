import { Center, Text, Button, Heading } from "native-base";
import { Feather } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }: any) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <Center flex={1}>
      <Heading mb="8">Settings Screen</Heading>
      <Button onPress={goBack}>
        <Text color="white">Go Back</Text>
      </Button>
    </Center>
  );
};

export default SettingsScreen;
