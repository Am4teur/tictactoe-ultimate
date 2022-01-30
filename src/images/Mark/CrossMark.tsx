import React, { memo, useEffect, useRef } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
// import Animated from "react-native-reanimated";
import { Animated, Easing } from "react-native";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CrossMarkProps extends SvgProps {
  playedByAI?: boolean;
  onTopOf3x3?: boolean;
}

const CrossMark = ({ stroke, playedByAI, onTopOf3x3 }: CrossMarkProps) => {
  const crossRef1 = useRef<typeof AnimatedPath>(null);
  const crossRef2 = useRef<typeof AnimatedPath>(null);

  // const length = Math.sqrt(Math.pow(300, 2) + Math.pow(300, 2)) * 2;
  const length = 300;

  const percentage = 100;
  const duration = 200;
  const delayAI = playedByAI ? duration + 100 : 0; // duration + a small delay between the twi players

  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animation = (toValue: any, delay: number, animatedValue: any) => {
    return Animated.timing(animatedValue, {
      delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage, delayAI, animatedValue1);
    animation(percentage, duration + delayAI, animatedValue2);
    animatedValue1.addListener(
      (v) => {
        const strokeDashoffset = length - (length * v.value) / 100;

        if (crossRef1?.current) {
          // @ts-ignore
          crossRef1.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      // @ts-ignore
      [percentage]
    );

    animatedValue2.addListener(
      (v) => {
        const strokeDashoffset = length - (length * v.value) / 100;

        if (crossRef2?.current) {
          // @ts-ignore
          crossRef2.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      // @ts-ignore
      [percentage]
    );

    return () => {
      animatedValue1.removeAllListeners();
      animatedValue2.removeAllListeners();
    };
  });

  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 300">
      {onTopOf3x3 && <Path fill="#fff" d="M0 0H300V300H0z" fillOpacity="0.6" />}

      <AnimatedPath
        // @ts-ignore
        ref={crossRef1}
        d="M60 240L240 60"
        stroke={stroke}
        strokeWidth={40}
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length}
      />
      <AnimatedPath
        // @ts-ignore
        ref={crossRef2}
        d="M60 60l180 180"
        stroke={stroke}
        strokeWidth={40}
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length}
      />
    </Svg>
  );
};

const Memo = memo(CrossMark);
export default Memo;
