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
    <StyledButton style={{ borderRadius: 0, ...style }} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  ${props =>
    props.variant === 'raised' &&
    `
      box-shadow: 2px 3px 0px 0px rgba(0, 0, 0, 0.25);
      &:hover {
        box-shadow: 3px 4px 0px 0px rgba(0, 0, 0, 0.25);
      }
      &:active {
        box-shadow: 3px 5px 0px 0px rgba(0, 0, 0, 0.25);
      } 
    `};
`;
