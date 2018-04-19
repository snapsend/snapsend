//@flow
import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import AddAPhoto from 'material-ui-icons/AddAPhoto';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { uploadImage } from '../uploadImage';
import { CircularProgress } from 'material-ui/Progress';

type P = {
  style?: any,
  handlePicChange: string => void,
  props?: any,
  profilePic: ?string,
  disabled?: boolean,
};
type S = {
  url: ?string,
  loading: boolean,
};

export default class ProfilePic extends React.Component<P, S> {
  state = {
    url: null,
    loading: false,
  };

  inputRef: ?HTMLInputElement;

  openPicker = () => {
    this.inputRef && this.inputRef.click();
  };

  handleFileChange = async (event: SyntheticEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { files } = currentTarget;

    if (files && files[0]) {
      // set a loading indicator
      this.setState({ loading: true });
      // send to filestack
      const res = await uploadImage(files[0]);
      // then call the change handleer
      this.props.handlePicChange(res.url);
    }
  };

  render() {
    const {
      profilePic,
      disabled,
      style = {},
      handlePicChange,
      ...props
    } = this.props;
    const { loading } = this.state;
    return (
      <React.Fragment>
        <Avatar
          style={{ width: 100, height: 100, ...style }}
          onClick={!disabled ? this.openPicker : undefined}
          src={profilePic}
          {...props}
        >
          {!profilePic &&
            (loading ? (
              <CircularProgress color="secondary" />
            ) : disabled ? (
              <AccountCircle />
            ) : (
              <AddAPhoto />
            ))}
        </Avatar>
        <input
          type="file"
          accept="image/*"
          onChange={this.handleFileChange}
          ref={r => (this.inputRef = r)}
          style={{ display: 'none' }}
        />
      </React.Fragment>
    );
  }
}
