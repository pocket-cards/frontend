import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import { Camera as CameraIcon } from '@material-ui/icons';
import * as RegistActions from '@actions/regist';
import WebCamera from '@components/WebCamera';

/** 単語カメラ画面 */
class A001 extends React.Component<Props, any, any> {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        // className={classes.root}
      >
        <WebCamera />
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
        <video autoPlay playsInline id="video" />
      </Grid>
    );
  }
}

const styles: StyleRules = {};

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(RegistActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(A001) as any;

/** Properties */
export interface Props extends WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions: RegistActions.Actions;
}
