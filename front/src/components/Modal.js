// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import type { Node } from 'react';
const modalRoot = document.getElementById('modal-root');

type Props = { children: Node };

export default class Modal extends React.Component<Props> {
  el: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (!modalRoot) return;
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    if (!modalRoot) return;
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
