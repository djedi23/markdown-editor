// -*- mode: rjsx -*-
import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { compose } from 'redux';
import Drawer from '../components/Drawer';
import Notification from '../components/Notification';
import drawerContainer from './Drawer';
import editorContainer from './Editor';
import appContainer from './AppContainer';
import projectContainer from '../containers/project';
import { history } from '../containers/History';

class App extends Component {
  props: {
    file: PropTypes.string,
    children: PropTypes.element,
    drawer: PropTypes.object,
    drawerToggle: PropTypes.func,
    content: PropTypes.string,
    saveContent: PropTypes.func,
    fileReadDir: PropTypes.func,
    title: PropTypes.string,
    routePath: PropTypes.string,
    modified: PropTypes.bool,
    project: PropTypes.object
  };

  saveHandler() {
    const { file, content, saveContent } = this.props;
    saveContent(file, content);
  }

  render() {
    const { drawer: { pinned }, drawerToggle, fileReadDir, title, modified, project, routePath } = this.props;
    console.log(routePath);
    const haveDrawer = !pinned && routePath !== '/';

    return (
      <div>
        <AppBar
          title={title}
          onLeftIconButtonTouchTap={() => {
            fileReadDir(project.path, project.path);
            drawerToggle();
          }}
          showMenuIconButton={haveDrawer}
          iconElementRight={(modified && <FlatButton label="Save" onClick={this.saveHandler.bind(this)} />) || <span />}
          className={`app-bar-position ${pinned ? 'pinned' : ''}`}
        />
        <Drawer />
        {this.props.children}
        <Notification />
      </div>
    );
  }
}

export default compose(history, drawerContainer, appContainer, editorContainer, projectContainer)(App);
