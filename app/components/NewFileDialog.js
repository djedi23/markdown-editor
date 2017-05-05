// -*- mode:rjsx -*-
import { Col, Grid, Row } from 'react-flexbox-grid';
import React, { PropTypes } from 'react';
import { compose } from 'redux';
import Dialog from 'material-ui/Dialog';
import drawerContainer from '../containers/Drawer';
import FlatButton from 'material-ui/FlatButton';
import { projectContainer } from '../containers/project';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


class NewFileDialog extends React.Component {
  state = { filename: '',
    directory: false }

  valueChange= (evt, value) => {
    this.setState({ filename: value });
  }
  directoryChange= (evt, value) => {
    this.setState({ directory: value });
  }

  handleClose = () => {
    this.props.drawerNewFileToggle();
  };

  handleCreate = () => {
    const { drawerNewFileToggle, fileCreateFile, fileCreateDirectory, dir, project } = this.props;
    const { filename, directory } = this.state;
    drawerNewFileToggle();
    if (directory) {
      fileCreateDirectory(project.path, dir, filename);
    } else {
      fileCreateFile(project.path, dir, `${filename}.md`);
    }
  }

  props: {
    drawerNewFileToggle: PropTypes.func,
    fileCreateFile: PropTypes.func,
    fileCreateDirectory: PropTypes.func,
    dir: PropTypes.string,
    project: PropTypes.object,
    drawer: PropTypes.object
  }

  render() {
    const { drawer: { newFile } } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create File"
        primary
        keyboardFocused
        onTouchTap={this.handleCreate}
      />,
    ];

    return (
      <Dialog
        title="New File ou directory"
        actions={actions}
        modal={false}
        open={newFile}
        onRequestClose={this.handleClose}
      >
        <Grid fluid>
          <Row>
            <Col>
              <TextField
                floatingLabelText="File Name"
                value={this.state.value}
                onChange={this.valueChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Toggle
                label="Directory"
                toggled={this.state.directory}
                onToggle={this.directoryChange}
              />
            </Col>
          </Row>
        </Grid>
      </Dialog>
    );
  }
}

export default compose(
  drawerContainer,
  projectContainer
)(NewFileDialog);
