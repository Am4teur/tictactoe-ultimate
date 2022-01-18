import { Box, Button } from "native-base";
import { ICoord } from "../../types/ICoord";

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
      <Button
        onPress={() => onSquarePress(boardId, i, j)}
        variant="unstyled"
        p="0"
        w="full"
        h="full"
      >
        {value}
      </Button>
    </Box>
  );
};

export default Square;
