//@flow
import * as React from 'react';
import type { Image as ImageType } from '../types';
import styled from 'styled-components';
import T from '../components/T';
import CheckCircle from 'material-ui-icons/CheckCircle';
import { withTheme } from 'material-ui/styles';
import Delete from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';

type Props = {
  img?: ImageType,
  toggle?: number => void,
  delete?: number => void,
  status?: 'DOWNLOADING' | 'REVIEWING' | 'EDITING',
};

type State = {
  hover: boolean,
};

const MAX_SIZE = 300;

export default class ImageComponent extends React.Component<Props, State> {
  state = {
    hover: false,
  };

  mouseEnter = () => this.setState({ hover: true });
  mouseLeave = () => this.setState({ hover: false });

  render() {
    const { img, toggle, delete: deleteImage, status } = this.props;
    const { hover } = this.state;
    if (!img) {
      return (
        <Outer>
          <Inner>
            <T variant="body1">Uploading image</T>
          </Inner>
        </Outer>
      );
    }
    const arr = img.url.split('/');
    const handle = arr[arr.length - 1];
    const src = `https://cdn.filestackcontent.com/resize=w:${MAX_SIZE},h:${MAX_SIZE}/output=f:jpg,c:true,q:80/${handle}`;
    return (
      <Outer
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={toggle}
        selected={img.selected}
      >
        <Check selected={img.selected} />
        <Image src={src} selected={img.selected} />
        {status === 'EDITING' &&
          hover && (
            <IconOverlay onClick={deleteImage}>
              <Delete style={{ fontSize: 50, color: 'white' }} />
            </IconOverlay>
          )}
      </Outer>
    );
  }
}

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

const IconOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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
