import React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const Board3by3Straight = ({ stroke, strokeWidth = 10 }: SvgProps) => (
  <Svg viewBox="0 0 300 300" width="100%" height="100%">
    <G stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
      <Path d="M100 10v280" />
      <Path d="M10 100h280" />
      <Path d="M200 10v280" />
      <Path d="M10 200h280" />
    </G>
  </Svg>
);

export default Board3by3Straight;
