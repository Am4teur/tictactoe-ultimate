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

  return (
    <>
      <Board nextRound={nextPlayer} player={player} />
      <Board nextRound={nextPlayer} player={player} />
    </>
  );
};

export default TTTGame;
