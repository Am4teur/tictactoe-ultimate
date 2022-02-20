import React, { useState } from "react";
import {
  Box,
  Text,
  FormControl,
  Radio,
  Button,
  HStack,
  Center,
  Flex,
  Stack,
  Heading,
  useColorModeValue,
} from "native-base";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Pressable } from "react-native";
import CircleMark from "../../images/Mark/CircleMark";
import CrossMark from "../../images/Mark/CrossMark";
import OptionsGroup from "../../components/OptionsGroup";

import { FontAwesome5 } from "@expo/vector-icons";
import Board3by3Straight from "../../images/Board/Board3by3Straight";
import Board3by3Drawish from "../../images/Board/Board3by3Drawish";

const SingleplayerOptionsScreen = ({ navigation: { navigate } }: any) => {
  const [startMark, setStartMark] = useState(0);
  const [playerMark, setPlayerMark] = useState(0);
  const [boardDesign, setBoardDesign] = useState(0);

  const onSubmit = () => {
    // const options = convertOptions();
    navigate("Singleplayer", {
      startMark,
      playerMark,
      boardDesign,
      playingVsAI: true,
    });
  };

  const handlePressStartMark = (option: number) => {
    setStartMark(option);
  };

  const handlePressPlayerMark = (option: number) => {
    setPlayerMark(option);
  };

  const handlePressBoardDesign = (option: number) => {
    setBoardDesign(option);
  };

  return (
    <ScreenWrapper>
      <FormControl>
        <OptionsGroup
          handlePress={handlePressPlayerMark}
          pressed={playerMark}
          heading={"Choose your mark"}
          firstImage={<CircleMark stroke="#1a91ff" />}
          secondImage={<CrossMark stroke="#f97316" />}
        ></OptionsGroup>
        <OptionsGroup
          handlePress={handlePressStartMark}
          pressed={startMark}
          heading={"Choose who starts first"}
          firstImage={
            <FontAwesome5
              name="smile"
              size={40}
              color={useColorModeValue("#000", "#fff")}
            />
          }
          secondImage={
            <FontAwesome5
              name="robot"
              size={32}
              color={useColorModeValue("#000", "#fff")}
            />
          }
        ></OptionsGroup>
        <OptionsGroup
          handlePress={handlePressBoardDesign}
          pressed={boardDesign}
          heading={"Choose your board style"}
          firstImage={
            <Board3by3Straight
              stroke={useColorModeValue("#000", "#fff")}
              strokeWidth={25}
            />
          }
          secondImage={
            <Board3by3Drawish
              stroke={useColorModeValue("#000", "#fff")}
              strokeWidth={25}
            />
          }
        ></OptionsGroup>

        <Button onPress={onSubmit} mt="5">
          Start
        </Button>
      </FormControl>
    </ScreenWrapper>
  );
};

export default SingleplayerOptionsScreen;
