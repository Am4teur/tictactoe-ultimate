import React, { useState, useEffect } from "react";
import { Center, Box, HStack, VStack } from "native-base";
import Board from "./Board";
import { Mark, markEnum } from "../../types/Mark";
import { ICoord } from "../../types/ICoord";
import Board3by3 from "../../images/Board3by3";
import Board3by3Straight from "../../images/Board3by3Straight";

const THREE = 3;

interface TTTGameProps {
  options: { ws: number; pm: string; bd: number };
  navigation: any;
}

interface BoardData {
  key: string;
  isPlayable: boolean;
  playerWonMark: Mark;
  boardId: ICoord;
  squares: Mark[][];
}

const TTTGame = ({ options, navigation }: TTTGameProps) => {
  const [playerMark, setPlayerMark] = useState<Mark>(options.pm as Mark);
  const isPlayingAI = true;
  const [winner, setWinner] = useState("");

  const getEmptySquares = (): Mark[][] => [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

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
          squares: getEmptySquares(),
        });
      }
      initialBoards.push(row);
    }
    return initialBoards;
  };
  const [boards, setBoards] = useState<BoardData[][]>(initBoards());

  const reset = () => {
    setBoards(initBoards());
  };

  useEffect(() => {
    setPlayerMark(options.pm as Mark);
  }, [options]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      reset();
      if (options.ws === 1) {
        const newBoards = initBoards();
        randomPlayAI(newBoards);
        setBoards(newBoards);
      }
    });
    return unsubscribe;
  }, [navigation]);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const nextPlayerMark = () => {
    return playerMark === "O" ? "X" : "O";
  };

  const updatePlayableBoards = (
    newBoards: BoardData[][],
    i: number,
    j: number
  ) => {
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

    return newBoards;
  };

  const checkWinner = (
    newBoards: BoardData[][],
    boardId: ICoord,
    i: number,
    j: number,
    currentPlayerMark: Mark
  ) => {
    const didWin = boardResultMark(boardId, i, j, currentPlayerMark);

    if (didWin) {
      newBoards[boardId.i][boardId.j].playerWonMark = didWin;
      const winner9x9 = board9x9ResultMark(
        boardId.i,
        boardId.j,
        currentPlayerMark
      );
      if (winner9x9) {
        console.log(`The Game finished, player ${winner9x9} won`);
        setWinner(winner9x9);
      }
    }
  };

  const handleTurn = (
    newBoards: BoardData[][],
    boardId: ICoord,
    i: number,
    j: number,
    currentPlayerMark: Mark
  ) => {
    updateSquare(newBoards, boardId, i, j, currentPlayerMark);

    checkWinner(newBoards, boardId, i, j, currentPlayerMark);

    updatePlayableBoards(newBoards, i, j);
  };

  const boardResultMark = (
    boardId: ICoord,
    row: number,
    col: number,
    currentPlayerMark: Mark
  ): Mark => {
    /*
    returns winner Mark === 'O' || 'X', if there is a winner
    returns markEnum.DRAW === 'D',      if there is a draw
    returns markEnum.EMPTY === '' ,     if it its still playable
    */
    const currentSquares = boards[boardId.i][boardId.j].squares;

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[row][k] === "" ||
        currentSquares[row][k] !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[k][col] === "" ||
        currentSquares[k][col] !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[k][k] === "" ||
        currentSquares[k][k] !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[THREE - k - 1][k] === "" ||
        currentSquares[THREE - k - 1][k] !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (let row of currentSquares) {
      for (let mark of row) {
        if (!mark) return markEnum.EMPTY;
      }
    }

    return markEnum.DRAW;
  };

  const board9x9ResultMark = (
    row: number,
    col: number,
    currentPlayerMark: Mark
  ): Mark => {
    /*
    returns winner Mark === 'O' || 'X', if there is a winner
    returns markEnum.DRAW === 'D',      if there is a draw
    returns markEnum.EMPTY === '' ,     if it its still playable 
    */
    for (var k = 0; k < THREE; k++) {
      if (
        boards[row][k].playerWonMark === "" ||
        boards[row][k].playerWonMark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        boards[k][col].playerWonMark === "" ||
        boards[k][col].playerWonMark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        boards[k][k].playerWonMark === "" ||
        boards[k][k].playerWonMark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        boards[THREE - k - 1][k].playerWonMark === "" ||
        boards[THREE - k - 1][k].playerWonMark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (let row of boards) {
      for (let mark of row) {
        if (!mark.playerWonMark) return markEnum.EMPTY;
      }
    }

    return markEnum.DRAW;
  };

  const getPlayableSquares = (currentBoards: BoardData[][]) => {
    let playableSquares: { boardId: ICoord; j: number; i: number }[] = [];

    currentBoards.forEach((row) => {
      row.forEach((board) => {
        if (board.isPlayable && !board.playerWonMark) {
          board.squares.forEach((squareRow, i) => {
            squareRow.forEach((square, j) => {
              if (!square) {
                playableSquares.push({ boardId: board.boardId, i: i, j: j });
              }
            });
          });
        }
      });
    });

    return playableSquares;
  };
  const randomPlayAI = (currentBoards: BoardData[][]) => {
    const playableSquares = getPlayableSquares(currentBoards);

    const randomSquare =
      playableSquares[getRandomInt(0, playableSquares.length - 1)];

    // play on that square
    if (randomSquare) {
      handleTurn(
        currentBoards,
        randomSquare.boardId,
        randomSquare.i,
        randomSquare.j,
        nextPlayerMark()
      );
    }
  };

  const updateSquare = (
    newBoards: BoardData[][],
    boardId: ICoord,
    i: number,
    j: number,
    currentPlayerMark: Mark
  ) => {
    if (
      newBoards[boardId.i][boardId.j].playerWonMark ||
      !newBoards[boardId.i][boardId.j].isPlayable
    )
      return;

    if (newBoards[boardId.i][boardId.j].squares[i][j]) return;
    newBoards[boardId.i][boardId.j].squares[i][j] = currentPlayerMark;
  };

  const onSquarePress = (boardId: ICoord, i: number, j: number) => {
    // updateSquare    boards => boards
    // handleTurn      boards => boards
    // check if win           boards => _
    // updatePlayableBoards   boards => boards

    // if 1 vs AI => AI play    === 4 previous steps
    // if 1 vs 1 => nextPlayerMark
    // setPlayerMark()

    // setBoards()

    // consideration:
    // reset que setBoards
    // AI plays first

    let newBoards = boards.slice();

    handleTurn(newBoards, boardId, i, j, playerMark);

    if (isPlayingAI) {
      randomPlayAI(newBoards);
    } else {
      setPlayerMark(nextPlayerMark());
    }

    setBoards(newBoards);
  };

  const getLineColor = (): string => {
    return winner === "O"
      ? "#1a91ff" // => darkBlue.400
      : winner === "X"
      ? "#f97316" // => orange.500 OR #dc2626 => red.600
      : winner === markEnum.DRAW
      ? "#737373" // => trueGray.500
      : "#000";
  };

  return (
    <>
      <VStack>
        <Center>
          <Box position="absolute" h="100%" w="100%">
            {options.bd === 0 ? (
              <Board3by3Straight lineColor={getLineColor()} small={false} />
            ) : (
              <Board3by3 lineColor={getLineColor()} />
            )}
          </Box>
          {boards.map((row, i) => (
            <HStack key={i}>
              {row.map((v) => (
                <Board
                  key={v.key}
                  id={v.boardId}
                  squares={v.squares}
                  isPlayable={v.isPlayable}
                  playerWonMark={v.playerWonMark}
                  isBoardDesignStraight={options.bd === 0}
                  onSquarePress={onSquarePress}
                />
              ))}
            </HStack>
          ))}
        </Center>
      </VStack>
    </>
  );
};

export default TTTGame;
