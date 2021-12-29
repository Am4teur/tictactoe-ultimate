import { Button, Box, Row, HStack, VStack } from "native-base";
import Square from "./Square";

type Props = {
  squares: string[][];
  showValue: (i: number, j: number) => void;
};

const Board = ({ squares, showValue }: Props) => {
  return (
    <VStack>
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
    </VStack>
  );
};

export default Board;
