import { Center } from "native-base";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ScreenWrapper = (props: Props) => {
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      p={4}
      flex={1}
    >
      {props.children}
    </Center>
  );
};

export default ScreenWrapper;
