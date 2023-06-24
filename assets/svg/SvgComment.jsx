import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgComment = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#BDBDBD"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 11.5a8.38 8.38 0 0 0 .9 3.8 8.5 8.5 0 0 0 7.6 4.7 8.38 8.38 0 0 0 3.8-.9L21 21l-1.9-5.7a8.38 8.38 0 0 0 .9-3.8 8.5 8.5 0 0 0-4.7-7.6 8.38 8.38 0 0 0-3.8-.9H11a8.48 8.48 0 0 0-8 8v.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComment;
