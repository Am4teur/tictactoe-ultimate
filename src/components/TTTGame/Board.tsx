import { Box, HStack, VStack, Center, useColorModeValue } from "native-base";
import React from "react";
import Square from "./Square";
import { Mark, markEnum } from "../../types/Mark";
import { ICoord } from "../../types/ICoord";
import Board3by3Drawish from "../../images/Board/Board3by3Drawish";
import Board3by3Straight from "../../images/Board/Board3by3Straight";
import CircleMark from "../../images/Mark/CircleMark";
import CrossMark from "../../images/Mark/CrossMark";
import DrawMark from "../../images/Mark/DrawMark";
import { SquareData } from "./TTTGame";

const THREE = 3;

interface IProps {
  isPlayable: boolean;
  playerWonMark: Mark;
  id: ICoord;
  isBoardDesignStraight: boolean;
  squares: SquareData[][];
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
  const getLineColor = (): any => {
    // https://docs.nativebase.io/default-theme
    return playerWonMark === "O"
      ? "#1a91ff" // => darkBlue.400
      : playerWonMark === "X"
      ? "#f97316" // => orange.500 OR #dc2626 => red.600
      : playerWonMark === markEnum.DRAW
      ? "#737373" // => trueGray.500
      : isPlayable
      ? "#22c55e" // => green.500
      : useColorModeValue("#000", "#fff");
  };

  return (
    <>
      <VStack my="3" mx="3">
        <Center>
          <Box position="absolute" h="100%" w="100%">
            {isBoardDesignStraight ? (
              <Board3by3Straight stroke={getLineColor()} />
            ) : (
              <Board3by3Drawish stroke={getLineColor()} />
            )}
          </Box>
          <Box
            position="absolute"
            h="100%"
            w="100%"
            zIndex={playerWonMark ? 1 : -1}
          >
            {playerWonMark === "O" ? (
              <CircleMark stroke="#1a91ff" onTopOf3x3 />
            ) : playerWonMark === "X" ? (
              <CrossMark stroke="#f97316" onTopOf3x3 playedByAI />
            ) : playerWonMark === markEnum.DRAW ? (
              <DrawMark stroke="#737373" />
            ) : null}
          </Box>
          {squares.map((row, i) => (
            <HStack key={i}>
              {row.map((v, j) => (
                <Square
                  key={`${i} ${j}`}
                  value={v.mark}
                  isAI={v.isAI}
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
