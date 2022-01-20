import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import SingleplayerScreen from "./screens/SingleplayerScreen";
import SingleplayerOptionsScreen from "./screens/SingleplayerOptionsScreen";
import MultiplayerScreen from "./screens/MultiplayerScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Feather } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      barStyle={{ backgroundColor: "#1a91ff" }}
    >
      <Tab.Screen name="Main" component={MainScreen} />

      <Tab.Screen
        name="Play"
        options={{
          tabBarLabel: "Singleplayer",
          tabBarIcon: ({ color }) => (
            <Feather
              name="user"
              color="white"
              size={26}
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
              component={SingleplayerOptionsScreen}
            />
            <Stack.Screen name="Singleplayer" component={SingleplayerScreen} />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Multiplayer"
        component={MultiplayerScreen}
        options={{
          tabBarLabel: "Multiplayer",
          tabBarIcon: ({ color }) => (
            <Feather
              name="users"
              color="white"
              size={26}
              _dark={{
                color: "warmGray.50",
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather
              name="settings"
              color="white"
              size={26}
              _dark={{
                color: "warmGray.50",
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Router;
