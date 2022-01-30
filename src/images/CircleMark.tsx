import React, { memo, useEffect, useRef } from "react";
import Svg, { SvgProps, Circle, G, Path } from "react-native-svg";
import { Animated, Easing } from "react-native";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircleMarkProps extends SvgProps {
  playedByAI?: boolean;
  onTopOf3x3?: boolean;
}

const CircleMark = ({ stroke, playedByAI, onTopOf3x3 }: CircleMarkProps) => {
  const circleRef = useRef<typeof AnimatedCircle>(null);

  const radius = 90; // 300/2 - line strokeWidth === 150 - 40 === 90;
  const length = 2 * Math.PI * radius;

  const percentage = 100;
  const duration = 400;
  const delayAI = playedByAI ? duration : 0;

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: any, delay: number) => {
    return Animated.timing(animatedValue, {
      delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage, delayAI);
    animatedValue.addListener(
      (v) => {
        const strokeDashoffset = length - (length * v.value) / 100;

        if (circleRef?.current) {
          // @ts-ignore
          circleRef.current.setNativeProps({
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
  }, []);

  const halfCircle = radius + 60;

  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 300">
      {onTopOf3x3 && <Path fill="#fff" d="M0 0H300V300H0z" fillOpacity="0.6" />}

      <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
        <AnimatedCircle
          ref={circleRef}
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={stroke}
          strokeWidth={40}
          strokeLinejoin="round"
          strokeDasharray={length}
          strokeDashoffset={length}
        />
      </G>
    </Svg>
  );
};

const Memo = memo(CircleMark);
export default Memo;
