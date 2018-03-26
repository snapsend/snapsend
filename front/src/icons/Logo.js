// @flow
import React from 'react';
import Logo from 'material-ui-icons/CameraRoll';

export default ({ style, ...props }: { style?: any, props?: any }) => (
  <Logo
    style={{
      color: '#333333',
      height: 34,
      width: 34,
      ...style,
    }}
    {...props}
  />
);
