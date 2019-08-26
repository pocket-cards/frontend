import * as React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, WithStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import * as AppActions from '@actions/app';

import Button from '@components/buttons/Button';
import { withStyles } from '@material-ui/styles';

/** 単語カメラ画面 */
class B001 extends React.Component<Props, any, any> {
  handleNew = () => {
    this.props.appActions.showHeader(false);
    this.props.appActions.showFooter(false);
    this.props.actions.startNew(this.props.history);
  }

  handleReview = () => {
    this.props.appActions.showHeader(false);
    this.props.appActions.showFooter(false);
    this.props.actions.startReview(this.props.history);
  }
  handleTest = () => {
    this.props.appActions.showHeader(false);
    this.props.appActions.showFooter(false);
    this.props.actions.startTest(this.props.history);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} justify="center">
        <Grid item className={classes.item}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleTest}>
            単語テスト
          </Button>
          <Button variant="contained" color="primary" className={classes.button}>
            未定
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleNew}>
            単語の学習
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleReview}>
            単語の復習
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const styles = ({ spacing }: Theme) => ({
  root: {
    padding: `${spacing(2)}px 0px`,
  },
  item: {
    padding: `${spacing()}px 0px`,
  },
  button: {
    width: spacing(20),
    height: spacing(20),
    margin: spacing(),
    letterSpacing: spacing(0.25),
    fontSize: '1.25rem',
    fontWeight: 600,
  },
});

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(StudyActions, dispatch),
  appActions: bindActionCreators(AppActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles as any),
  connect(
    null,
    mapDispatchToProps,
  ),
)(B001) as any;

/** Properties */
export interface Props extends RouteComponentProps<{}>, WithStyles {
  actions: StudyActions.Actions;
  appActions: AppActions.Actions;
}
