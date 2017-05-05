import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NotifyActions from '../actions/notification';

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...NotifyActions }, dispatch);
}

export default connect(null, mapDispatchToProps);
export const notification = connect(mapStateToProps);
