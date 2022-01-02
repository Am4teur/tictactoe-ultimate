import React, { useState } from "react";
import { Button, Box, HStack, Text, VStack } from "native-base";
import Board from "./Board";
import Mark from "../../types/Mark";

const THREE = 3;

const TTTGame = () => {
  const [player, setPlayer] = useState<Mark>("O");
  const [currentBoard, setCurrentBoard] = useState<any>(null);

  const playerHasPlayed = (i: number, j: number, hasWon: boolean) => {
    const newBoards = boards.slice();
    if (currentBoard) {
      newBoards[currentBoard.i][currentBoard.j].isPlayable = false;
      if (hasWon) {
        newBoards[currentBoard.i][currentBoard.j].playerWonMark = player;
      }
    } else {
      //recheck this, i think it only happens in the first round
      newBoards.map((row) => {
        row.map((v) => {
          return Object.assign(v, { isPlayable: false });
        });
      });
    }

    if (newBoards[i][j].playerWonMark) {
      newBoards.map((row) => {
        row.map((v) => {
          if (!v.playerWonMark) {
            return Object.assign(v, { isPlayable: true });
          }
        });
      });
      setCurrentBoard(null);
    } else {
      newBoards[i][j].isPlayable = true;
      setCurrentBoard({ i: i, j: j });
    }
    setPlayer(player === "O" ? "X" : "O");
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
          playerWonMark: "" as Mark,
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
                playerWonMark={v.playerWonMark}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </>
  );
};

export default TTTGame;
