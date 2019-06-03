import * as React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import { withStyles, Grid, Button } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 単語カメラ画面 */
class B001 extends React.Component<Props, any, any> {
  handleClick = () => {
    const { actions, history } = this.props;

    actions.startNew(history);
  }

  render() {
    const { classes } = this.props;

    console.log(this.props);
    return (
      <Grid container alignItems="center" className={classes.root} direction="column">
        <Grid item className={classes.item}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
            前回のテスト
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
            今日の学習
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
            今日のテスト
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick}>
            今日の復習
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  root: {
    padding: `${unit * 2}px 0px`,
  },
  item: {
    padding: `${unit}px 0px`,
  },
  button: {
    width: unit * 20,
  },
});

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
