import React from "react";
import { Box, Button } from "native-base";
import { ICoord } from "../../types/ICoord";
import CircleMark from "../../images/Mark/CircleMark";
import CrossMark from "../../images/Mark/CrossMark";

type Props = {
  value: string;
  onSquarePress: (boardId: ICoord, i: number, j: number) => void;
  boardId: ICoord;
  i: number;
  j: number;
  isAI: boolean;
};

const Square = ({ value, onSquarePress, boardId, i, j, isAI }: Props) => {
  return (
    <Box w="8" h="8">
      {value === "O" && <CircleMark stroke="#1a91ff" playedByAI={isAI} />}
      {/* #1a91ff => darkBlue.400 */}
      {value === "X" && <CrossMark stroke="#f97316" playedByAI={isAI} />}
      {/* #f97316 => orange.500 */}
      {/* OR #dc2626 => red.600 */}
      <Button
        onPress={() => onSquarePress(boardId, i, j)}
        variant="unstyled"
        p="0"
        w="full"
        h="full"
      ></Button>
    </Box>
  );
};

export default React.memo(Square);
