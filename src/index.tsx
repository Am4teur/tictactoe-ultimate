import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import SingleplayerScreen from "./screens/Singleplayer/SingleplayerScreen";
import SingleplayerOptionsScreen from "./screens/Singleplayer/SingleplayerOptionsScreen";
import WinnerScreen from "./screens/WinnerScreen";
import MultiplayerScreen from "./screens/MultiplayerScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Feather } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: "#1a91ff" }}
      >
        <Tab.Screen
          name="Home"
          component={MainScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Feather
                name="home"
                color="white"
                size={24}
                _dark={{
                  color: "warmGray.50",
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Play"
          options={{
            tabBarLabel: "Singleplayer",
            tabBarIcon: ({ color }) => (
              <Feather
                name="user"
                color="white"
                size={24}
                _dark={{
                  color: "warmGray.50",
                }}
              />
            ),
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="SingleplayerOptions"
                options={{ title: "Options" }}
                component={SingleplayerOptionsScreen}
              />
              <Stack.Screen
                name="Singleplayer"
                component={SingleplayerScreen}
              />
              <Stack.Screen name="WinnerScreen" component={WinnerScreen} />
            </Stack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="MultiplayerTab"
          listeners={({ navigation }) => ({
            tabPress: () => {
              const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: "MultiplayerTab" }],
              });
              navigation.dispatch(resetAction);
            },
          })}
          options={{
            tabBarLabel: "Multiplayer",
            tabBarIcon: ({ color }) => (
              <Feather
                name="users"
                color="white"
                size={24}
                _dark={{
                  color: "warmGray.50",
                }}
              />
            ),
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="Multiplayer" component={MultiplayerScreen} />
              <Stack.Screen name="WinnerScreen" component={WinnerScreen} />
            </Stack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <Feather
                name="settings"
                color="white"
                size={24}
                _dark={{
                  color: "warmGray.50",
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default Router;
