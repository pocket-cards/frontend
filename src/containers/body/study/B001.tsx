import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { Actions } from '@actions/app';
import Button from '@components/buttons/Button';
import { WordList } from '@components/functions';
import { Paths } from '@constants';
import { State } from '@models';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    button: {
      width: spacing(20),
      // height: spacing(20),
      letterSpacing: spacing(0.25),
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  })
);

const e000 = (state: State) => state.get('e000');
const app = (state: State) => state.get('app');

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(StudyActions, useDispatch());
  const appActions = bindActionCreators(Actions, useDispatch());
  const { words } = useSelector(e000);
  const { groupId } = useSelector(app);

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

  const groupWords = words.filter((item) => item.groupId === groupId);

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" alignItems="center" margin={1} height="128px">
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleRegist}
            // @ts-ignore
            component={Link}
            to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Regist]}>
            新規登録
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleTest}>
            テスト
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary" className={classes.button} onClick={handleNew}>
            学習
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleReview}>
            復習
          </Button>
        </Box>
      </Box>
      {(() => {
        if (groupWords.length === 0) return;

        return <WordList list={groupWords[0].words}></WordList>;
      })()}
    </React.Fragment>
  );
};
