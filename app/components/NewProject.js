// -*- mode:rjsx -*-
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card';
import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Grid } from 'react-flexbox-grid';
import { isEmpty } from 'lodash';
import TextField from 'material-ui/TextField';
import { projectsActionsContainer } from '../containers/Projects';
import history from '../containers/History';
import { compose } from 'redux';

class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      path: '',
      name: ''
    };
  }

  createProjectHandler(evt) {
    evt.preventDefault();
    const { name, path } = this.state;
    console.log('Create Project', this.state, this.props);
    if (!isEmpty(name) && !isEmpty(path)) {
      this.props.createProject(this.state);
      this.props.goToPage('/');
    }
  }

  render() {
    const { name, path } = this.state;
    return (
      <form onSubmit={this.createProjectHandler.bind(this)}>
        <Grid>
          <Card>
            <CardTitle title="New Project" />
            <CardText>
              <TextField floatingLabelText="Project Name" fullWidth value={name} onChange={(_, value) => { this.setState({ name: value }); }} />
              <TextField floatingLabelText="Project Path" fullWidth value={path} onChange={(_, value) => { this.setState({ path: value }); }} />
            </CardText>
            <CardActions>
              <FlatButton type="submit" label="create" primary />
            </CardActions>
          </Card>
        </Grid>
      </form>
    );
  }
}

NewProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default compose(
  projectsActionsContainer,
  history
)(NewProject);
