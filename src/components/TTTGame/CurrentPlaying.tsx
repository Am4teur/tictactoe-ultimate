import React from "react";
import { Center, Text, Box } from "native-base";
import { Mark } from "../../types/Mark";
import CircleMark from "../../images/Mark/CircleMark";
import CrossMark from "../../images/Mark/CrossMark";

interface CurrentPlayingProps {
  playerMark: Mark;
  color: string;
}

const CurrentPlaying = ({ playerMark, color }: CurrentPlayingProps) => (
  <Center>
    <Text fontSize="3xl" color={color}>
      Player{" "}
      {playerMark === "O" && (
        <Box w="10" h="10">
          <CircleMark stroke="#1a91ff" />
        </Box>
      )}
      {playerMark === "X" && (
        <Box w="10" h="10">
          <CrossMark stroke="#f97316" playedByAI />
        </Box>
      )}{" "}
      turn
    </Text>
  </Center>
);

export default CurrentPlaying;
