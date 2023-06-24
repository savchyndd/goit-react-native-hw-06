import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgArrowLeft = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.stroke || '#212121'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.8}
      d="M20 12H4m6 6-6-6 6-6"
    />
  </Svg>
);
export default SvgArrowLeft;
