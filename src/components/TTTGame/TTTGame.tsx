import React, { useState } from "react";
import { Button, Box, HStack, Text, VStack } from "native-base";
import Board from "./Board";
import { Mark } from "../../types/Mark";
import { ICoord } from "../../types/ICoord";

const THREE = 3;

const TTTGame = () => {
  const [player, setPlayer] = useState<Mark>("O");

  const playerHasPlayed = (
    boardId: ICoord,
    i: number,
    j: number,
    boardResultMark: Mark
  ) => {
    const newBoards = boards.slice();

    if (boardResultMark) {
      newBoards[boardId.i][boardId.j].playerWonMark = boardResultMark;
    }
    setPlayer(player === "O" ? "X" : "O");

    newBoards.map((row) => {
      row.map((v) => {
        return Object.assign(v, { isPlayable: false });
      });
    });

    if (newBoards[i][j].playerWonMark) {
      newBoards.map((row) => {
        row.map((v) => {
          if (!v.playerWonMark) {
            return Object.assign(v, { isPlayable: true });
          }
        });
      });
    } else {
      newBoards[i][j].isPlayable = true;
    }
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
          boardId: { i, j } as ICoord,
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
                id={v.boardId}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </>
  );
};

export default TTTGame;
