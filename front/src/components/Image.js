//@flow
import * as React from 'react';
import type { SuccessImage } from '../types';
import styled from 'styled-components';
import T from '../components/T';
import CheckCircle from 'material-ui-icons/CheckCircle';
import { withTheme } from 'material-ui/styles';

export default ({
  img,
  toggle,
}: {
  img?: SuccessImage,
  toggle?: number => void,
}) => {
  if (!img) {
    return (
      <Outer>
        <Inner>
          <T variant="body1">Uploading image</T>
        </Inner>
      </Outer>
    );
  }
  return (
    <Outer onClick={toggle} selected={img.selected}>
      <Check selected={img.selected} />
      <Image src={img.url} selected={img.selected} />
    </Outer>
  );
};

const Outer = styled.div`
  position: relative;
  padding-top: 100%;
  background: rgba(0, 0, 0, 0.6);
  transition: 20ms ease-in-out;
  transform: ${({ selected }) => (selected ? 'scale(0.9)' : 'scale(1)')};
  cursor: pointer;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: papayawhip;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Check = withTheme()(styled(CheckCircle)`
  position: absolute;
  top: -10px;
  opacity: ${({ selected }) => (selected ? 1 : 0)};
  transition: 20ms ease-in-out;
  right: -10px;
  color: ${({ theme }) => theme.palette.secondary.main};
  transform: scale(1.5);
  background: white;
  border-radius: 100%;
`);
