import React, { memo } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CrossMark = ({ stroke }: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 300 300">
    <Path
      d="M60 240L240 60M60 60l180 180"
      stroke={stroke}
      strokeWidth={30}
      strokeLinecap="round"
    />
  </Svg>
);

const Memo = memo(CrossMark);
export default Memo;
