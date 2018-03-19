import React from 'react';
import Typography from 'material-ui/Typography';

export default ({
  children,
  variant = 'body1',
  ...props
}: {
  variant?: string,
  children: React.Node,
  props: any,
}) => (
  <Typography variant={variant} {...props}>
    {children}
  </Typography>
);
