//@flow
import * as React from 'react';
import Button from 'material-ui/Button';
import styled from 'styled-components';

export default ({
  children,
  style = {},
  ...props
}: {
  children: React.Node,
  style?: any,
  props?: any,
}) => {
  return (
    <Button style={{ borderRadius: 0, ...style }} {...props}>
      {children}
    </Button>
  );
};
