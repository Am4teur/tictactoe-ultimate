import { Box, HStack, VStack, Center } from "native-base";
import React from "react";
import Square from "./Square";
import { Mark, markEnum } from "../../types/Mark";
import { ICoord } from "../../types/ICoord";
import Board3by3 from "../../images/Board3by3";
import Board3by3Straight from "../../images/Board3by3Straight";

const THREE = 3;

interface IProps {
  isPlayable: boolean;
  playerWonMark: Mark;
  id: ICoord;
  isBoardDesignStraight: boolean;
  squares: Mark[][];
  onSquarePress: (boardId: ICoord, i: number, j: number) => void;
}

const Board = ({
  isPlayable,
  playerWonMark,
  id,
  isBoardDesignStraight,
  squares,
  onSquarePress,
}: IProps) => {
  const getLineColor = (): string => {
    // https://docs.nativebase.io/default-theme
    return playerWonMark === "O"
      ? "#1a91ff" // => darkBlue.400
      : playerWonMark === "X"
      ? "#f97316" // => orange.500 OR #dc2626 => red.600
      : playerWonMark === markEnum.DRAW
      ? "#737373" // => trueGray.500
      : isPlayable
      ? "#22c55e" // => green.500
      : "#000";
  };

  return (
    <>
      <VStack my="3" mx="3">
        <Center>
          <Box position="absolute" h="100%" w="100%">
            {isBoardDesignStraight ? (
              <Board3by3Straight lineColor={getLineColor()} small={true} />
            ) : (
              <Board3by3 lineColor={getLineColor()} />
            )}
          </Box>
          {squares.map((row, i) => (
            <HStack key={i}>
              {row.map((v, j) => (
                <Square
                  key={`${i} ${j}`}
                  value={v}
                  onSquarePress={onSquarePress}
                  boardId={id}
                  i={i}
                  j={j}
                />
              ))}
            </HStack>
          ))}
        </Center>
      </VStack>
    </>
  );
};

export default Board;
