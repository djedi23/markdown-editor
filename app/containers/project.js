import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectActions from '../actions/project';
import { push } from 'react-router-redux';


function mapStateToProps(state) {
  return {
    project: state.project
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({ ...ProjectActions }, dispatch),
    closeProject: () => {
      dispatch(ProjectActions._closeProject());
      dispatch(push('/'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps);
export const projectActionsContainer = connect(null, mapDispatchToProps);
export const projectContainer = connect(mapStateToProps);
