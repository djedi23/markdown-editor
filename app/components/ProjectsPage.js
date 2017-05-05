// -*- mode:rjsx -*-
import React, { Component } from 'react';
import NewProject from './NewProject';
import ProjectsList from './ProjectsList';
import { projectsContainer } from '../containers/Projects';
import { isEmpty } from 'lodash';

class ProjectsPage extends Component {
  render() {
    const { projects } = this.props;
    if (isEmpty(projects)) {
      return (
        <NewProject />
      );
    }
    return (
      <ProjectsList projects={projects} />
    );
  }
}


export default projectsContainer(ProjectsPage);
