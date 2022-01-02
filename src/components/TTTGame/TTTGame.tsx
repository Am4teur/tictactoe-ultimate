import React, { useState } from "react";
import { Button, Box, HStack, Text, VStack } from "native-base";
import Board from "./Board";
import Mark from "../../types/Mark";

const THREE = 3;

const TTTGame = () => {
  const [player, setPlayer] = useState<Mark>("O");
  const [currentBoard, setCurrentBoard] = useState<any>(null);

  const playerHasPlayed = (i: number, j: number) => {
    setPlayer(player === "O" ? "X" : "O");

    const newBoards = boards.slice();
    if (currentBoard) {
      newBoards[currentBoard.i][currentBoard.j].isPlayable = false;
    } else {
      newBoards.map((row) => {
        row.map((v) => {
          return Object.assign(v, { isPlayable: false });
        });
      });
    }

    newBoards[i][j].isPlayable = true;
    setCurrentBoard({ i: i, j: j });
    setBoards(newBoards);
  };

  const initBoards = () => {
    const initialBoards = [];
    for (let i = 0; i < THREE; i++) {
      let row = [];
      for (let j = 0; j < THREE; j++) {
        row.push({
          key: `${i}-${j}`,
          isPlayable: true,
        });
      }
      initialBoards.push(row);
    }
    return initialBoards;
  };
  const [boards, setBoards] = useState(initBoards());

  return (
    <>
      <VStack>
        {boards.map((row, i) => (
          <HStack key={i}>
            {row.map((v) => (
              <Board
                key={v.key}
                playerHasPlayed={playerHasPlayed}
                playerMark={player}
                isPlayable={v.isPlayable}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </>
  );
};

export default TTTGame;
