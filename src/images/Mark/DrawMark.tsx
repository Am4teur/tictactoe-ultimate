import React, { memo, useEffect, useRef } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
// import Animated from "react-native-reanimated";
import { Animated, Easing } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const DrawMark = ({ stroke }: SvgProps) => {
  const DrawRef = useRef<typeof AnimatedPath>(null);

  // const length = Math.sqrt(Math.pow(300, 2) + Math.pow(300, 2)) * 2;
  const length = 300;

  const percentage = 100;
  const duration = 200;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: any) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animatedValue.addListener(
      (v) => {
        const strokeDashoffset = length - (length * v.value) / 100;

        if (DrawRef?.current) {
          // @ts-ignore
          DrawRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      // @ts-ignore
      [percentage]
    );

    return () => {
      animatedValue.removeAllListeners();
    };
  });

  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 300">
      {/* This component is only used when winning a 3x3, thus no condition is needed for the background
      Otherwise, we can delete or modify the background conditionally (if it is used on top of 3x3 or not) */}
      <Path fill="#fff" d="M0 0H300V300H0z" fillOpacity="0.6" />

      <AnimatedPath
        // @ts-ignore
        ref={DrawRef}
        d="M60 150h180"
        stroke={stroke}
        strokeWidth={40}
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length}
      />
    </Svg>
  );
};

const Memo = memo(DrawMark);
export default Memo;
