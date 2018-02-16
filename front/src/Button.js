//@flow
import * as React from 'react';
import Button from 'material-ui/Button';
import styled from 'styled-components';

export default ({
  children,
  ...props
}: {
  children: React.Node,
  props?: any,
}) => {
  return (
    <Button style={{ color: '#333333', borderRadius: 0 }} {...props}>
      {children}
    </Button>
  );
};
