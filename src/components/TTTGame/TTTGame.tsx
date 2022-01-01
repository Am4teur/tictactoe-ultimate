import React, { useState } from "react";
import { Button, Box, HStack, Text } from "native-base";
import Board from "./Board";

const TTTGame = () => {
  const [round, setRound] = useState(0);

  const nextRound = () => {
    const newRound = round + 1;
    setRound(newRound);
  };

  return (
    <>
      <Board nextRound={nextRound} player={round % 2 === 0 ? "X" : "O"} />
      <Board nextRound={nextRound} player={round % 2 === 0 ? "X" : "O"} />
    </>
  );
};

export default TTTGame;
