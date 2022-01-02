import React, { useState } from "react";
import { Button, Box, HStack, Text } from "native-base";
import Board from "./Board";
import mark from "../../types/mark";

const TTTGame = () => {
  const [player, setPlayer] = useState<mark>("O");

  const nextPlayer = () => {
    const newPlayer = player === "O" ? "X" : "O";
    setPlayer(newPlayer);
  };

  const initialBoards = [{ isPlayable: true }, { isPlayable: true }];

  const [boards, setBoards] = useState(initialBoards);

  return (
    <>
      {boards.map((state) => {
        return (
          <Board
            nextPlayer={nextPlayer}
            playerMark={player}
            isPlayable={state.isPlayable}
          />
        );
      })}
    </>
  );
};

export default TTTGame;
