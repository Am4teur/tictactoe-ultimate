import React from "react";
import { Text, Center, Box } from "native-base";
import { Mark } from "../../types/Mark";
import CircleMark from "../../images/CircleMark";
import CrossMark from "../../images/CrossMark";

interface DisplayWinnerProps {
  winner: Mark;
  color: string;
}

const DisplayWinner = ({ winner, color }: DisplayWinnerProps) => (
  <Center>
    <Text fontSize="3xl" color={color}>
      Player{" "}
      {winner === "O" && (
        <Box w="10" h="10">
          <CircleMark stroke="#1a91ff" />
        </Box>
      )}
      {winner === "X" && (
        <Box w="10" h="10">
          <CrossMark stroke="#f97316" playedByAI />
        </Box>
      )}{" "}
      Won!
    </Text>
  </Center>
);

export default DisplayWinner;
