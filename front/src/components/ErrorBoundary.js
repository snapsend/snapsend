// @flow

import React from 'react';
import type { Node } from 'react';
import T from '../components/T';
import AppBar from 'material-ui/AppBar';
import { MainAppBar } from '../components/AppBar';

type Props = { children: Node };
export default class ErrorBoundary extends React.Component<
  Props,
  { hasError: boolean }
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <AppBar elevation={4} component="header" square>
          <MainAppBar />
        </AppBar>
      );
    }
    return this.props.children;
  }
}
