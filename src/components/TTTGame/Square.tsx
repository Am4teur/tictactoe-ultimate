import { Box, Button } from "native-base";

type Props = {
  value: string;
  showValue: (i: number, j: number) => void;
  i: number;
  j: number;
  borderColor: string;
};

const Square = ({ value, showValue, i, j, borderColor }: Props) => {
  return (
    <Box
      borderWidth={2}
      borderColor={borderColor}
      borderStyle="solid"
      w="8"
      h="8"
    >
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
