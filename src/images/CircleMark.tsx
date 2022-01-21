import React, { memo } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CircleMark = ({ stroke }: SvgProps) => (
  <Svg width="100%" height="100%" viewBox="0 0 300 300">
    <Path
      d="M240 150c0 51.362-39.19 90-90 90s-90-38.638-90-90 39.19-90 90-90 90 38.638 90 90z"
      stroke={stroke}
      strokeWidth={30}
    />
  </Svg>
);

const Memo = memo(CircleMark);
export default Memo;
