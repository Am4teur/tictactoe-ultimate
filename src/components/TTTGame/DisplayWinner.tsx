import React from "react";
import { Text, Center, Box } from "native-base";
import { Mark } from "../../types/Mark";
import CircleMark from "../../images/Mark/CircleMark";
import CrossMark from "../../images/Mark/CrossMark";

interface DisplayWinnerProps {
  winner: Mark;
  color: string;
}

const DisplayWinner = ({ winner, color }: DisplayWinnerProps) => (
  <Center>
    {winner === "O" || winner === "X" ? (
      <Text fontSize="3xl" color={color}>
        Player{" "}
        {winner === "O" && (
          <Box w="10" h="10">
            <CircleMark stroke="#1a91ff" />
          </Box>
        )}
        {winner === "X" && (
          <Box w="10" h="10">
            <CrossMark stroke="#f97316" />
          </Box>
        )}{" "}
        Won!
      </Text>
    ) : (
      // it's a draw
      <Text fontSize="3xl" color={color}>
        It's a Draw
      </Text>
    )}
  </Center>
);

export default DisplayWinner;
