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
import ScreenWrapper from "../components/ScreenWrapper";

interface SProps {
  state: string;
}

const SingleplayerOptionsScreen = ({ navigation: { navigate } }: any) => {
  const [whoStarts, setWhoStarts] = useState("0");
  const [playerMark, setPlayerMark] = useState("O");
  const [boardDesign, setBoardDesign] = useState("0");

  const convertOptions = (): { ws: number; pm: string; bd: number } => {
    const ws = whoStarts === "0" ? 0 : 1;
    // const pm = playerMark === '0' ? 0 : 1;
    const bd = boardDesign === "0" ? 0 : 1;

    return { ws, pm: playerMark, bd };
  };

  const onSubmit = () => {
    const options = convertOptions();
    navigate("Singleplayer", options);
  };

  return (
    <ScreenWrapper>
      <Heading>Singleplayer Options Screen</Heading>
      <FormControl>
        <Center>
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
        </Center>
        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Start
        </Button>
      </FormControl>
    </ScreenWrapper>
  );
};

export default SingleplayerOptionsScreen;
