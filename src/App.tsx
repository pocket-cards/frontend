import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Paths, Consts } from '@constants';
import { Header, Footer } from '@containers/com';
import { RegistMain, StudyMain, MyPageMain, Settings, Home } from '@containers/body';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    root: {
      backgroundColor: palette.grey[200],
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    body: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      maxHeight: `calc(100vh - ${Consts.HEADER_HEIGHT + Consts.FOOT_HEIGHT}px)`,
      height: `calc(100vh - ${Consts.HEADER_HEIGHT + Consts.FOOT_HEIGHT}px)`,
    },
    noFooter: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      maxHeight: `calc(100vh - ${Consts.HEADER_HEIGHT}px)`,
      height: `calc(100vh - ${Consts.HEADER_HEIGHT}px)`,
    },
  })
);

export default () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Header />
      <div className={classes.body}>
        <Switch>
          <Route exact path="/" component={Settings} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Regist]} component={RegistMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.MyPage]} component={MyPageMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]} component={StudyMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Settings]} component={Settings} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Groups]} component={Home} />
        </Switch>
      </div>
      <Footer />
    </Box>
  );
};
