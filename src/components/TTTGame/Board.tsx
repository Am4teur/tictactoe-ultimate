import { Button, Box, Row, HStack, VStack, Text, Center } from "native-base";
import React, { useState, useEffect } from "react";
import Square from "./Square";
import Mark from "../../types/Mark";
import { ICoord } from "../../types/ICoord";

const THREE = 3;

interface IProps {
  playerHasPlayed: (id: ICoord, i: number, j: number, hasWon: boolean) => void;
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

  const didWon = (row: number, col: number) => {
    // check if row is all === and !== ''
    // [i][j] j++
    // same but colum
    // [i][j] i++
    // same but diagonal
    // [k][k] k++
    const symbol: Mark = squares[row][col];

    for (var k = 0; k < THREE; k++) {
      if (squares[row][k] === "" || squares[row][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) {
      return true;
    }

    for (var k = 0; k < THREE; k++) {
      if (squares[k][col] === "" || squares[k][col] !== symbol) {
        break;
      }
    }
    if (k === THREE) {
      return true;
    }

    for (var k = 0; k < THREE; k++) {
      if (squares[k][k] === "" || squares[k][k] !== symbol) {
        break;
      }
    }
    if (k === THREE) {
      return true;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        squares[THREE - k - 1][k] === "" ||
        squares[THREE - k - 1][k] !== symbol
      ) {
        break;
      }
    }
    if (k === THREE) {
      return true;
    }

    return false;
  };

  const showValue = (/*boardNumber: number,*/ i: number, j: number) => {
    if (playerWonMark || !isPlayable) return;

    const newSquares = squares.slice();
    if (newSquares[i][j]) return;
    newSquares[i][j] = playerMark;
    setSquares(newSquares);

    playerHasPlayed(id, i, j, didWon(i, j));
  };

  return (
    <>
      <VStack>
        <Center
          rounded="lg"
          p={3}
          bg={
            playerWonMark === "O"
              ? "blue.400"
              : playerWonMark === "X"
              ? "red.400"
              : isPlayable
              ? "green.400"
              : null
          }
        >
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
        <Button onPress={reset} variant="unstyled">
          <Text fontWeight="medium">Reset</Text>
        </Button>
        {playerWonMark ? <Text>{} Winner!</Text> : null}
      </VStack>
    </>
  );
};

export default Board;
