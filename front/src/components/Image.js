//@flow
import * as React from 'react';
import type { SuccessImage } from '../types';
import styled from 'styled-components';
import T from '../components/T';

export default ({ img }: { img?: SuccessImage }) => {
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
    <Outer>
      <Image src={img.url} />
    </Outer>
  );
};

const Outer = styled.div`
  position: relative;
  padding-top: 100%;
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
  background: rgba(0, 0, 0, 0.6);
`;
