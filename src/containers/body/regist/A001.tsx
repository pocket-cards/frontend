import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter, Switch, Route, Link } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import { Camera as CameraIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

class A001 extends React.Component<Props, any, any> {

  handleClick = () => {
    const { history } = this.props;
  }

  render() {
    const { actions, classes, match } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
      >
        <Fab
          aria-label="Camera"
          // className={classes.fab}
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          component={(props: any) => <Link to={ROUTE_PATHS.Footer[ROUTE_PATH_INDEX.Study]} {...props} />}
        >
          <CameraIcon />
        </Fab>
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
)(withStyles(styles)(A001)));

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions?: AppActions.Actions;
}
