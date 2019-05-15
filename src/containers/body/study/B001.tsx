import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Button } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 単語カメラ画面 */
class B001 extends React.Component<Props, any, any> {
  handleClick = () => {
    const { actions, history } = this.props;

    actions.studyStart(history);

    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        // className={classes.root}
      >
        <Button
          variant="contained"
          color="primary"
          // className={classes.button}
          onClick={this.handleClick}
        >
          学習開始
        </Button>
      </Grid>
    );
  }
}

const styles: StyleRules = {};

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(StudyActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(B001) as any;

/** Properties */
export interface Props extends WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions: StudyActions.Actions;
}
