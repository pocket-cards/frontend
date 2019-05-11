import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import { Camera as CameraIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 単語カメラ画面 */
class A001 extends React.Component<Props, any, any> {
  render() {
    const { match } = this.props;
    return (
      <Grid container alignItems="center" justify="center">
        <Fab
          aria-label="Camera"
          // className={classes.fab}
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          component={(props: any) => (
            <Link to={`${match.path}/list`} {...props} />
          )}
        >
          <CameraIcon />
        </Fab>
      </Grid>
    );
  }
}

const mapStateToProps = (state: IState) => ({});

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   actions: bindActionCreators(AppActions, dispatch),
// });

// const styles: StyleRules = {};

// export default withRouter(
//   connect<StateFromProps, void, void, IState>(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(withStyles(styles)(A001)),
// );

export default withRouter(connect(mapStateToProps)(A001));
/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props
  extends StateFromProps,
    WithStyles<StyleRules>,
    RouteComponentProps<{}> {}
