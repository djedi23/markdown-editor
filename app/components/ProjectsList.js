// -*- mode:rjsx -*-
import { GridList, GridTile } from 'material-ui/GridList';
import React, { Component, PropTypes } from 'react';

import { compose } from 'redux';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { values } from 'lodash';

import history from '../containers/History';
import { projectActionsContainer } from '../containers/project';

const maxHsl = 360;

class ProjectsList extends Component {
  props: {
    goToPage: PropTypes.func,
    openProject: PropTypes.func,
    project: PropTypes.object
  };

  render() {
    const { projects, goToPage, openProject } = this.props;
    return (
      <div>
        <GridList
          cols={4}
          cellHeight={180}
        >
          {values(projects).map((project) =>
            <GridTile
              key={project.name}
              title={project.name}
              subtitle={<span>@ <b>{project.path}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              onClick={() => { openProject(project); goToPage('/edit'); }}
            >
              <div style={{ width: '100%', height: '100%', background: `hsl(${Math.random() * maxHsl}, 100%, 50%)` }} />
            </GridTile>
                               )}
        </GridList>
        <FloatingActionButton
          onClick={() => goToPage('/newProject')} style={{ right: '1em',
            position: 'absolute',
            bottom: '1em' }}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}


export default compose(
  history,
  projectActionsContainer
)(ProjectsList);
