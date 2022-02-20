import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, Button, HStack, Stack, Heading } from "native-base";
import { Feather } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import ScreenWrapper from "../components/ScreenWrapper";

interface MainScreenArgs {
  navigation: any;
}

const MainScreen = ({ navigation }: MainScreenArgs) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e: any) => {
      e.preventDefault();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Home" }],
        })
      );
    });

    return unsubscribe;
  }, [navigation]);

  const goToSingleplayerOptionsScreen = () => {
    navigation.navigate("Play", {
      screen: "SingleplayerOptions",
    });
  };

  const goToMultiplayerScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MultiplayerTab" }],
      })
    );
    navigation.navigate("MultiplayerTab");
  };

  const goToSettingsScreen = () => {
    navigation.navigate("Settings");
  };

  return (
    <ScreenWrapper>
      <Stack alignItems="center">
        <Heading py="6">Ultimate Tic Tac Toe</Heading>

        {/* Buttons */}
        <Stack
          flex={1}
          justifyContent="space-between"
          mt="10"
          mb="20"
          direction={{
            base: "column",
            md: "row",
          }}
          mx={{
            base: "auto",
            md: "0",
          }}
        >
          <Button
            size="lg"
            px="8"
            py="5"
            onPress={goToSingleplayerOptionsScreen}
            shadow="5"
          >
            <HStack alignItems="center">
              <Feather
                name="user"
                color="white"
                size={26}
                _dark={{
                  color: "warmGray.50",
                }}
              />
              <Text fontSize="xl" fontWeight="medium" color="white" pl="4">
                Singleplayer
              </Text>
            </HStack>
          </Button>
          <Button
            size="lg"
            px="8"
            py="5"
            onPress={goToMultiplayerScreen}
            shadow="5"
          >
            <HStack alignItems="center">
              <Feather
                name="users"
                color="white"
                size={26}
                _dark={{
                  color: "warmGray.50",
                }}
              />
              <Text fontSize="xl" fontWeight="medium" color="white" pl="4">
                Multiplayer
              </Text>
            </HStack>
          </Button>
          <Button
            size="lg"
            px="8"
            py="5"
            onPress={goToSettingsScreen}
            shadow="5"
          >
            <HStack alignItems="center">
              <Feather
                name="settings"
                color="white"
                size={26}
                _dark={{
                  color: "warmGray.50",
                }}
              />
              <Text fontSize="xl" fontWeight="medium" color="white" pl="4">
                Settings
              </Text>
            </HStack>
          </Button>
        </Stack>
      </Stack>

      <StatusBar style="auto" />
    </ScreenWrapper>
  );
};

export default MainScreen;
