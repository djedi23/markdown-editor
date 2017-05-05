import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


function mapStateToProps(state) {
  return {
    routePath: state.routing.locationBeforeTransitions.pathname,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    goToPage: (path) => {
      dispatch(push(path));
    }
  };
}

export default connect(null, mapDispatchToProps);

export const history = connect(mapStateToProps);
