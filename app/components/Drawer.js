// -*- mode:rjsx -*-
import { basename, dirname, join } from 'path';
import { blue500, red500 } from 'material-ui/styles/colors';
import React, { Component, PropTypes } from 'react';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ActionNew from 'material-ui/svg-icons/action/note-add';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import Checkbox from 'material-ui/Checkbox';
import { clipboard } from 'electron';
import { compose } from 'redux';
import Drawer from 'material-ui/Drawer';
import DrawerPin from 'material-ui/svg-icons/action/lock-outline';
import DrawerUnpin from 'material-ui/svg-icons/action/lock-open';
import File from 'material-ui/svg-icons/editor/text-fields';
import Folder from 'material-ui/svg-icons/file/folder';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import drawerContainer from '../containers/Drawer';
import NewFileDialog from './NewFileDialog';
import ProjectContainer from '../containers/project';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import Raven from 'raven-js';

class drawer extends Component {
  constructor(props) {
    super(props);
    this.requestChangeHandler = this.requestChangeHandler.bind(this);
    this.drawerPinToggle = props.drawerPinToggle.bind(this);
    this.newFileHandler = this.newFileHandler.bind(this);
    this.closeProjectHandler = this.closeProjectHandler.bind(this);
  }

  props: {
    drawer: PropTypes.object,
    drawerToggle: PropTypes.func,
    drawerPinToggle: PropTypes.func,
    loadContent: PropTypes.func,
    fileReadDir: PropTypes.func,
    project: PropTypes.object,
    closeProject: PropTypes.func.isRequired,
    dir: PropTypes.string,
    files: PropTypes.string,
    onlyMD: PropTypes.bool,
    fileToggleMD: PropTypes.func,
    drawerNewFileToggle: PropTypes.func
  };

  requestChangeHandler() {
    this.props.drawerToggle();
  }

  openFileHandler(file) {
    if (!file.directory) {
      this.props.loadContent(join(this.props.dir, file.name));
      if (!this.props.drawer.pinned) this.props.drawerToggle();
    } else {
      this.props.fileReadDir(this.props.project.path, join(this.props.dir, file.name));
    }
  }
  newFileHandler() {
    this.props.drawerNewFileToggle();
  }
  closeProjectHandler() {
    this.props.closeProject();
    if (!this.props.drawer.pinned) this.props.drawerToggle();
  }

  iconColor(file) {
    if (file.isStatusModified) { return blue500; }
    if (file.isStatusNew) { return red500; }
    return null;
  }

  render() {
    try {
      const { drawer: { open, pinned, newFile }, files = [], onlyMD, fileToggleMD } = this.props;

      return (
        <Drawer open={open} docked={pinned} onRequestChange={this.requestChangeHandler} >
          <Toolbar>
            <ToolbarGroup firstChild>
              <IconButton tooltip="New File" onClick={this.newFileHandler}>
                <ActionNew />
              </IconButton>
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              <IconButton tooltip="Close Project" onClick={this.closeProjectHandler}>
                <Back />
              </IconButton>
              <Checkbox
                style={{ width: 'auto' }}
                checked={onlyMD}
                onCheck={fileToggleMD}
                checkedIcon={<Visibility />}
                uncheckedIcon={<VisibilityOff />}
              />
              <Checkbox
                checked={pinned}
                onCheck={this.drawerPinToggle}
                checkedIcon={<DrawerPin />}
                uncheckedIcon={<DrawerUnpin />}
              />
            </ToolbarGroup>
          </Toolbar>
          {files.map((file) =>
            <MenuItem
              key={file.name}
              onTouchTap={this.openFileHandler.bind(this, file)}
              leftIcon={file.directory ?
                <Folder color={this.iconColor(file)} /> :
                <File color={this.iconColor(file)} />}
              rightIcon={<IconMenu
                style={{ margin: '0px 5px' }}
                iconStyle={{ opacity: 0.25 }}
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onTouchTap={(event) => { event.preventDefault(); event.stopPropagation(); }}
              >
                <MenuItem primaryText="Copy" onTouchTap={() => { clipboard.writeText(file.isDirectory ? file.relative : join(dirname(file.relative), basename(file.relative, '.md'))); }} />
                <MenuItem primaryText="Delete" disabled />
              </IconMenu>}
            >{file.name}
            </MenuItem>
                    )}
          {newFile && <NewFileDialog />}
        </Drawer>
      );
    } catch (e) {
      Raven.captureException(e);
      throw e;
    }
  }
}


export default compose(
  drawerContainer,
  ProjectContainer
)(drawer);
