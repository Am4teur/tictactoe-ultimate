import { Box, Button } from "native-base";
import { ICoord } from "../../types/ICoord";
import CircleMark from "../../images/CircleMark";
import CrossMark from "../../images/CrossMark";

type Props = {
  value: string;
  onSquarePress: (boardId: ICoord, i: number, j: number) => void;
  boardId: ICoord;
  i: number;
  j: number;
};

const Square = ({ value, onSquarePress, boardId, i, j }: Props) => {
  return (
    <Box w="8" h="8">
      {value === "O" && <CircleMark stroke="#1a91ff" />}
      {/* #1a91ff => darkBlue.400 */}
      {value === "X" && <CrossMark stroke="#f97316" playedByAI />}
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

export default Square;
