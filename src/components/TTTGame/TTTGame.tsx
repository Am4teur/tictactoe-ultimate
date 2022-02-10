import React, { useState, useEffect, useRef } from "react";
import { Center, Box, HStack, VStack, Text } from "native-base";
import Board from "./Board";
import { Mark, markEnum } from "../../types/Mark";
import { ICoord } from "../../types/ICoord";
import Board3by3Drawish from "../../images/Board/Board3by3Drawish";
import Board3by3Straight from "../../images/Board/Board3by3Straight";
import CurrentPlaying from "./CurrentPlaying";

const THREE = 3;

const optionsPlayerMarkEnum = ["O" as Mark, "X" as Mark];

interface TTTGameProps {
  options: { startMark: number; playerMark: number; boardDesign: number };
  navToWinnerScreen: (winnerMark: Mark) => void;
}

export interface SquareData {
  mark: Mark;
  isAI: boolean;
}

interface BoardData {
  key: string;
  isPlayable: boolean;
  playerWonMark: Mark;
  boardId: ICoord;
  squares: SquareData[][];
}

export const getPlayerColor = (mark: Mark): string => {
  // https://docs.nativebase.io/default-theme
  return mark === "O"
    ? "#1a91ff" // => darkBlue.400
    : "#f97316"; // => orange.500 OR #dc2626 => red.600
};

const TTTGame = ({ options, navToWinnerScreen }: TTTGameProps) => {
  const [playerMark, setPlayerMark] = useState<Mark>(
    optionsPlayerMarkEnum[options.playerMark]
  );
  const isPlayingAI = false;
  const winner = useRef<Mark>("");

  const getEmptySquares = (): SquareData[][] => [
    [
      { mark: "", isAI: false },
      { mark: "", isAI: false },
      { mark: "", isAI: false },
    ],
    [
      { mark: "", isAI: false },
      { mark: "", isAI: false },
      { mark: "", isAI: false },
    ],
    [
      { mark: "", isAI: false },
      { mark: "", isAI: false },
      { mark: "", isAI: false },
    ],
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

  useEffect(() => {
    if (options.startMark === 1) {
      const newBoards = boards.slice();
      randomPlayAI(newBoards);
      setBoards(newBoards);
    }
  }, []);

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

  const handleWinner = (winner9x9: Mark) => {
    console.log(`The Game finished, player ${winner9x9} won`);
    winner.current = winner9x9;
    navToWinnerScreen(winner9x9);
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
        handleWinner(winner9x9);
      }
    }
  };

  const handleTurn = (
    newBoards: BoardData[][],
    boardId: ICoord,
    i: number,
    j: number,
    currentPlayerMark: Mark,
    isAI: boolean = false
  ) => {
    updateSquare(newBoards, boardId, i, j, currentPlayerMark, isAI);

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
        currentSquares[row][k].mark === "" ||
        currentSquares[row][k].mark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[k][col].mark === "" ||
        currentSquares[k][col].mark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[k][k].mark === "" ||
        currentSquares[k][k].mark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (var k = 0; k < THREE; k++) {
      if (
        currentSquares[THREE - k - 1][k].mark === "" ||
        currentSquares[THREE - k - 1][k].mark !== currentPlayerMark
      ) {
        break;
      }
    }
    if (k === THREE) {
      return currentPlayerMark;
    }

    for (let row of currentSquares) {
      for (let squareData of row) {
        if (!squareData.mark) return markEnum.EMPTY;
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
              if (!square.mark) {
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
        nextPlayerMark(),
        true
      );
    }
  };

  const updateSquare = (
    newBoards: BoardData[][],
    boardId: ICoord,
    i: number,
    j: number,
    currentPlayerMark: Mark,
    isAI: boolean = false
  ) => {
    const squareToUpdate = newBoards[boardId.i][boardId.j].squares[i][j];
    if (squareToUpdate.mark) return;

    squareToUpdate.mark = currentPlayerMark;
    squareToUpdate.isAI = isAI;
  };

  const isBoardPlayable = (boardId: ICoord): boolean => {
    const board = boards[boardId.i][boardId.j];
    if (board.playerWonMark || !board.isPlayable) return false;
    return true;
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

    if (!isBoardPlayable(boardId)) {
      return;
    }

    let newBoards = boards.slice();

    handleTurn(newBoards, boardId, i, j, playerMark);

    if (isPlayingAI && !winner.current) {
      randomPlayAI(newBoards);
    } else {
      setPlayerMark(nextPlayerMark());
    }

    setBoards(newBoards);
  };

  const getLineColor = (): string => {
    return winner.current === "O"
      ? "#1a91ff" // => darkBlue.400
      : winner.current === "X"
      ? "#f97316" // => orange.500 OR #dc2626 => red.600
      : winner.current === markEnum.DRAW
      ? "#737373" // => trueGray.500
      : "#000";
  };

  return (
    <>
      <VStack>
        {!isPlayingAI ? (
          <CurrentPlaying
            playerMark={playerMark}
            color={getPlayerColor(playerMark)}
          />
        ) : null}

        <Center>
          <Box position="absolute" h="100%" w="100%">
            {options.boardDesign === 0 ? (
              <Board3by3Straight stroke={getLineColor()} />
            ) : (
              <Board3by3Drawish stroke={getLineColor()} />
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
                  isBoardDesignStraight={options.boardDesign === 0}
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
