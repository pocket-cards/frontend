import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import { Camera as CameraIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';

const fabButton = () => (
  <Fab
    aria-label="Camera"
    // className={classes.fab}
    size="large"
    color="secondary"
    disableFocusRipple
    disableTouchRipple
    disableRipple
  >
    <CameraIcon />
  </Fab>
);

class Camera extends React.Component<Props, any, any> {

  render() {
    const { actions, classes, match } = this.props;

    console.log(this.props);
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
      >
        <Switch>
          <Route path={`${match.url}`} exact component={fabButton}  />
          <Route path={`${match.url}/regist`} component={Fab} />
        </Switch>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

const styles: StyleRules = {

};

export default withRouter(connect<StateFromProps, void, void, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Camera)));

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions?: AppActions.Actions;
}
