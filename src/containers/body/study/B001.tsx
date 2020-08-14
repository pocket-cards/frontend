import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { Actions } from '@actions/app';
import Button from '@components/buttons/Button';
import { Paths } from '@constants';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    button: {
      width: spacing(25),
      // height: spacing(20),
      letterSpacing: spacing(0.25),
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  })
);

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(StudyActions, useDispatch());
  const appActions = bindActionCreators(Actions, useDispatch());

  const handleNew = () => {
    appActions.showHeader(false);
    appActions.showFooter(false);
    actions.startNew();
  };

  const handleReview = () => {
    appActions.showHeader(false);
    appActions.showFooter(false);
    actions.startReview();
  };

  const handleTest = () => {
    appActions.showHeader(false);
    appActions.showFooter(false);
    actions.startTest();
  };

  const handleRegist = () => {};

  return (
    <Box display="flex" flexDirection="column" margin={2}>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleRegist}
          size="large"
          // @ts-ignore
          component={Link}
          to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Regist]}>
          新規登録
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleTest} size="large">
          テスト
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" className={classes.button} onClick={handleNew} size="large">
          学習
        </Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleReview} size="large">
          復習
        </Button>
      </Box>
    </Box>
  );
};
