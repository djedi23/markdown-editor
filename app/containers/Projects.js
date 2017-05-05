import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProjectsActions from '../actions/projects';

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectsActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps);
export const projectsActionsContainer = connect(null, mapDispatchToProps);
export const projectsContainer = connect(mapStateToProps);
