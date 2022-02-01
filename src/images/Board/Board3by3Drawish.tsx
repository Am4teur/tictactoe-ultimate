import React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";

const Board3by3Drawish = ({ stroke, strokeWidth = 10 }: SvgProps) => (
  <Svg viewBox="0 0 275.271 278.868" width="100%" height="100%">
    <G stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
      <Path d="M86.2 17.928c.92 41.9 5.3 209.35 6.4 250.94m-9.7-253.25c.57 41.15 6.69 206.83 8.18 249.39" />
      <Path d="M179.999 13.03c.44 41.22 2.99 207.57 3.8 249.76M177.209 10c1.1 41.37 10.95 213.28 11.83 255.15" />
      <Path d="M260.205 97.105c-42.09-1.24-209.13-4.1-250.2-4.91m252.69 8.66c-41.6-1.62-207.21-9.33-249.13-11.1" />
      <Path d="M262.611 195.451c-41.87-.86-209.44-6.75-251.23-7.84m253.89 5.84c-41.12-1.33-208.46-7.62-249.89-8.66" />
    </G>
  </Svg>
);

export default Board3by3Drawish;
