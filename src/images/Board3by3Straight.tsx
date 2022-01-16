import React from "react";
import Svg, { Path } from "react-native-svg";

interface svgProps {
  lineColor: string;
  small: boolean;
}

const Board3by3Straight = ({ lineColor, small }: svgProps) =>
  small ? (
    <Svg viewBox="0 0 360 360" width="100%" height="100%">
      <Path
        d="M130 50v260M50 130h260M230 50v260M50 230h260"
        stroke={lineColor}
        strokeWidth={10}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  ) : (
    <Svg viewBox="0 0 320 320" width="100%" height="100%">
      <Path
        d="M110 10v300M10 110h300M210 10v300M10 210h300"
        stroke={lineColor}
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );

export default Board3by3Straight;
