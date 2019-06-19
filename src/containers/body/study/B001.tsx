import * as React from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import { withStyles, Grid } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import Button from '@components/buttons/Button';

/** 単語カメラ画面 */
class B001 extends React.Component<Props, any, any> {
  handleNew = () => this.props.actions.startNew(this.props.history);
  handleReview = () => this.props.actions.startReview(this.props.history);
  handleTest = () => this.props.actions.startTest(this.props.history);

  render() {
    const { classes } = this.props;

    console.log(this.props);
    return (
      <Grid container className={classes.root} justify="center">
        <Grid item className={classes.item}>
          <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleTest}>
            単語テスト
          </Button>
          <Button variant="contained" color="secondary" className={classes.button}>
            未定
          </Button>
        </Grid>
        <Grid item className={classes.item}>
          <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleNew}>
            単語の学習
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleReview}>
            単語の復習
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
    height: unit * 20,
    margin: unit,
    letterSpacing: unit / 4,
    fontSize: '1.25rem',
    fontWeight: 600,
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
