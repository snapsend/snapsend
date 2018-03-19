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
    <Button style={{ borderRadius: 0 }} {...props}>
      {children}
    </Button>
  );
};
