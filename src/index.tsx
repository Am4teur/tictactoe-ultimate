import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainScreen from "./screens/MainScreen";
import SingleplayerScreen from "./screens/SingleplayerScreen";
import SingleplayerOptionsScreen from "./screens/SingleplayerOptionsScreen";
import MultiplayerScreen from "./screens/MultiplayerScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Singleplayer" component={SingleplayerScreen} />
      <Drawer.Screen
        name="SingleplayerOptions"
        component={SingleplayerOptionsScreen}
      />
      <Drawer.Screen name="Multiplayer" component={MultiplayerScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default Router;
