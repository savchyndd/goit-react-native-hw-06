import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgLogOut = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#BDBDBD"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5m7 14 4-4-4-4m4 4H9"
    />
  </Svg>
);
export default SvgLogOut;
