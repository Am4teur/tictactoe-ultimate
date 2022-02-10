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
    navigate("Singleplayer", { startMark, playerMark, boardDesign });
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
        {/* <Center>
          <Heading>Play as</Heading>
          <Box w="100%">
            <Radio.Group
              name="playerMark"
              value={playerMark}
              onChange={(nextValue) => {
                setPlayerMark(nextValue);
              }}
            >
              <Stack
                justifyContent="center"
                space="md"
                direction={{
                  base: "row",
                  md: "row",
                }}
                w="100%"
              >
                <Radio value="O" my="1">
                  O
                </Radio>
                <Radio value="X" my="1">
                  X
                </Radio>
              </Stack>
            </Radio.Group>
          </Box>
        </Center>
        <Center my="6">
          <Heading>Who starts?</Heading>
          <Box w="100%">
            <Radio.Group
              name="whoStarts"
              value={whoStarts}
              onChange={(nextValue) => {
                if (nextValue === "0") {
                  setWhoStarts("0");
                } else {
                  setWhoStarts("1");
                }
              }}
            >
              <Stack
                justifyContent="center"
                space="md"
                direction={{
                  base: "row",
                  md: "row",
                }}
                w="100%"
              >
                <Radio value="0" my="1">
                  you
                </Radio>
                <Radio value="1" my="1">
                  AI
                </Radio>
              </Stack>
            </Radio.Group>
          </Box>
        </Center>
        <Center>
          <Heading>Board Style</Heading>
          <Box w="100%">
            <Radio.Group
              name="whoStarts"
              value={boardDesign}
              onChange={(nextValue) => {
                if (nextValue === "0") {
                  setBoardDesign("0");
                } else {
                  setBoardDesign("1");
                }
              }}
            >
              <Stack
                justifyContent="center"
                space="md"
                direction={{
                  base: "row",
                  md: "row",
                }}
                w="100%"
              >
                <Radio value="0" my="1">
                  Straight
                </Radio>
                <Radio value="1" my="1">
                  Drawish
                </Radio>
              </Stack>
            </Radio.Group>
          </Box>
        </Center> */}

        <OptionsGroup
          handlePress={handlePressStartMark}
          pressed={startMark}
          heading={"Choose your mark"}
          firstImage={<CircleMark stroke="#1a91ff" />}
          secondImage={<CrossMark stroke="#f97316" />}
        ></OptionsGroup>
        <OptionsGroup
          handlePress={handlePressPlayerMark}
          pressed={playerMark}
          heading={"Choose who starts first"}
          firstImage={<FontAwesome5 name="smile" size={40} color="black" />}
          secondImage={<FontAwesome5 name="robot" size={32} color="black" />}
        ></OptionsGroup>
        <OptionsGroup
          handlePress={handlePressBoardDesign}
          pressed={boardDesign}
          heading={"Choose your board style"}
          firstImage={<Board3by3Straight stroke="#000" strokeWidth={25} />}
          secondImage={<Board3by3Drawish stroke="#000" strokeWidth={25} />}
        ></OptionsGroup>

        <Button onPress={onSubmit} mt="5">
          Start
        </Button>
      </FormControl>
    </ScreenWrapper>
  );
};

export default SingleplayerOptionsScreen;
