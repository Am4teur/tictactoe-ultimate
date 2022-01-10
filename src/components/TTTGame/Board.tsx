import { Button, Box, Row, HStack, VStack, Text, Center } from "native-base";
import React, { useState, useEffect } from "react";
import Square from "./Square";
import { Mark, markEnum } from "../../types/Mark";
import { ICoord } from "../../types/ICoord";
import Board3by3 from "../../images/Board3by3";

const THREE = 3;

interface IProps {
  playerHasPlayed: (
    id: ICoord,
    i: number,
    j: number,
    boardResultMark: Mark
  ) => void;
  playerMark: Mark;
  isPlayable: boolean;
  playerWonMark: Mark;
  id: ICoord;
}

const Board = ({
  playerHasPlayed,
  playerMark,
  isPlayable,
  playerWonMark,
  id,
}: IProps) => {
  const initialBoard: Mark[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [squares, setSquares] = useState(initialBoard);

  const reset = () => {
    setSquares(initialBoard);
  };

  const boardResultMark = (row: number, col: number): Mark => {
    /*
    returns winner Mark === 'O' || 'X', if there is a winner
    returns markEnum.DRAW === 'D',      if there is a draw
    returns markEnum.EMPTY === '' ,     if it its still playable 
    */
    for (var k = 0; k < THREE; k++) {
      if (squares[row][k] === "" || squares[row][k] !== playerMark) {
        break;
      }
    }
    if (k === THREE) {
      return playerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (squares[k][col] === "" || squares[k][col] !== playerMark) {
        break;
      }
    }
    if (k === THREE) {
      return playerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (squares[k][k] === "" || squares[k][k] !== playerMark) {
        break;
      }
    }
    if (k === THREE) {
      return playerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        squares[THREE - k - 1][k] === "" ||
        squares[THREE - k - 1][k] !== playerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return playerMark;
    }

    for (let row of squares) {
      for (let mark of row) {
        if (!mark) return markEnum.EMPTY;
      }
    }

    return markEnum.DRAW;
  };

  const showValue = (/*boardNumber: number,*/ i: number, j: number) => {
    if (playerWonMark || !isPlayable) return;

    const newSquares = squares.slice();
    if (newSquares[i][j]) return;
    newSquares[i][j] = playerMark;
    setSquares(newSquares);

    playerHasPlayed(id, i, j, boardResultMark(i, j));
  };

  return (
    <>
      <VStack>
        <Center>
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            h="100%"
            w="100%"
          >
            {/* https://docs.nativebase.io/default-theme */}
            <Board3by3
              lineColor={
                playerWonMark === "O"
                  ? "#1a91ff" // darkBlue.400
                  : playerWonMark === "X"
                  ? "#dc2626" // red.600
                  : playerWonMark === markEnum.DRAW
                  ? "#737373" // trueGray.500
                  : isPlayable
                  ? "#22c55e" // green.500
                  : "#000"
              }
            />
          </Box>
          {squares.map((row, i) => (
            <HStack key={i}>
              {row.map((v, j) => (
                <Square
                  key={`${i} ${j}`}
                  value={v}
                  showValue={showValue}
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
