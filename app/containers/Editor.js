import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContentActions from '../actions/content';

function mapStateToProps(state) {
  return {
    file: state.content.file,
    content: state.content.content,
    modified: state.content.modified
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ContentActions }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps);
