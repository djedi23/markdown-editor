// -*- mode:rjsx -*-
import React, { Component, PropTypes } from 'react';
import { notification } from '../containers/Notification';
import Snackbar from 'material-ui/Snackbar';


class Notification extends Component {
  constructor(props) {
    super(props);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  props: {
    dispatch: PropTypes.func,
    notification: PropTypes.object
//     notification: PropTypes.shape({
//       open: PropTypes.bool,
//       msg: PropTypes.string,
//       type: PropTypes.string
//     })
  };


  handleRequestClose() {
    this.props.dispatch({ type: 'NOTIFICATION_HIDE', open: false });
  }

  render() {
    const { msg, type, open } = this.props.notification;
    return (
      <Snackbar
        open={open}
        message={msg}
        onRequestClose={this.handleRequestClose}
        className={`notification-${type}`}
      />
    );
  }
}
//      autoHideDuration={4000}

export default notification(Notification);
