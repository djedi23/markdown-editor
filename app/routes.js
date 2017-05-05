// -*- mode:rjsx -*-
// @flow
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './containers/App';
import EditorPage from './containers/EditorPage';
import ProjectsPage from './components/ProjectsPage';
import NewProject from './components/NewProject';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectsPage} />
    <Route path="edit" component={EditorPage} />
    <Route path="projects" component={ProjectsPage} />
    <Route path="newProject" component={NewProject} />
  </Route>
);
