import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import * as StudyActions from '@actions/study';
import * as AppActions from '@actions/app';
import Button from '@components/buttons/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
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
  })
);

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(StudyActions, useDispatch());
  const appActions = bindActionCreators(AppActions, useDispatch());
  const { history } = useReactRouter();

  const handleNew = () => {
    appActions.showHeader(false);
    appActions.showFooter(false);
    actions.startNew(history);
  };

  const handleReview = () => {
    appActions.showHeader(false);
    appActions.showFooter(false);
    actions.startReview(history);
  };

  const handleTest = () => {
    appActions.showHeader(false);
    appActions.showFooter(false);
    actions.startTest(history);
  };

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item className={classes.item}>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleTest}>
          単語テスト
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          未定
        </Button>
      </Grid>
      <Grid item className={classes.item}>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleNew}>
          単語の学習
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleReview}>
          単語の復習
        </Button>
      </Grid>
    </Grid>
  );
};
