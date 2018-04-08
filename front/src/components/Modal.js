// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import type { Node } from 'react';
import styled from 'styled-components';
import Card from 'material-ui/Card';
const modalRoot = document.getElementById('modal-root');

type Props = { children: Node };

class Modal extends React.Component<Props> {
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

export default ({ children }: { children: Node }) => {
  return (
    <Modal>
      <ModalWrap>
        <ModalInner>{children}</ModalInner>
      </ModalWrap>
    </Modal>
  );
};

const ModalInner = styled(Card)`
  width: 90%;
  height: 90%;
  max-width: 700px;
  max-height: 550px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  position: relative;
`;

const ModalWrap = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
