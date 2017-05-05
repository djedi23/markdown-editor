// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import content from './content';
import drawer from './drawer';
import files from './files';
import project from './project';
import projects from './projects';
import notification from './notification';

const rootReducer = combineReducers({
  routing,
  content,
  drawer,
  files,
  project,
  projects,
  notification
});

export default rootReducer;
