import { Box, Button } from "native-base";

type Props = {
  value: string;
  showValue: (i: number, j: number) => void;
  i: number;
  j: number;
};

const Square = ({ value, showValue, i, j }: Props) => {
  return (
    <Box borderWidth={2} borderColor="gray.800" borderStyle="solid" w="8" h="8">
      <Button
        onPress={() => showValue(i, j)}
        variant="unstyled"
        p="0"
        w="full"
        h="full"
      >
        {value !== "N" ? value : null}
      </Button>
    </Box>
  );
};

export default Square;
