import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContentActions from '../actions/content';
import * as DrawerActions from '../actions/drawer';
import * as FilesActions from '../actions/files';

function mapStateToProps(state) {
  return {
    drawer: state.drawer,
    files: state.files.files,
    dir: state.files.dir,
    onlyMD: state.files.onlyMD
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ContentActions, ...DrawerActions, ...FilesActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps);
export const drawerActionsContainer = connect(null, mapDispatchToProps);
