import { Box, Center, Flex, Heading, Stack } from "native-base";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { motify, useAnimationState } from "moti";

interface OptionsGroupProps {
  handlePress: (option: number) => void;
  heading: string;
  pressed: number;
  firstImage: React.ReactElement;
  secondImage: React.ReactElement;
}

const MotiPressable = motify(Pressable)();

const OptionsGroup = ({
  handlePress,
  pressed,
  heading,
  firstImage,
  secondImage,
}: OptionsGroupProps) => {
  const animationState1 = useAnimationState({
    highlighted: { borderColor: "blue.500", scale: 1.2, opacity: 1 },
    notH: { borderColor: "gray.500", scale: 1, opacity: 0.5 },
  });
  const animationState2 = useAnimationState({
    highlighted: { borderColor: "blue.500", scale: 1.2, opacity: 1 },
    notH: { borderColor: "gray.500", scale: 1, opacity: 0.5 },
  });

  const animationPress = () => {
    handlePress(0);
  };

  useEffect(() => {
    if (pressed === 0) {
      animationState1.transitionTo("highlighted");
      animationState2.transitionTo("notH");
    } else {
      animationState1.transitionTo("notH");
      animationState2.transitionTo("highlighted");
    }
  }, [pressed]);

  return (
    <Center mb="4">
      <Heading>{heading}</Heading>
      <Flex direction="row" my={4}>
        <MotiPressable
          onPress={() => handlePress(0)}
          state={animationState1}
          transition={{
            type: "timing",
            duration: 150,
          }}
        >
          <Box
            h={16}
            w={16}
            borderColor={pressed === 0 ? "blue.500" : "gray.500"}
            borderStyle="solid"
            borderWidth="4"
            borderRadius={12}
            p={2}
            mr={8}
          >
            <Stack justifyContent="center" alignItems="center">
              {firstImage}
            </Stack>
          </Box>
        </MotiPressable>
        <MotiPressable
          onPress={() => handlePress(1)}
          state={animationState2}
          transition={{
            type: "timing",
            duration: 150,
          }}
        >
          <Box
            h={16}
            w={16}
            borderColor={pressed === 1 ? "blue.500" : "gray.500"}
            borderStyle="solid"
            borderWidth="4"
            borderRadius={12}
            p={2}
          >
            {secondImage}
          </Box>
        </MotiPressable>
      </Flex>
    </Center>
  );
};

export default OptionsGroup;
