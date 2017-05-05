import { connect } from 'react-redux';
import { join, relative } from 'path';

function mapStateToProps(state) {
  const title = state.content.file && relative(state.project.path || process.env.PROJECT || '', state.content.file);
  return {
    title: title || 'Markdown Editor',
  };
}
export default connect(mapStateToProps);
