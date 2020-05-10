import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Paths } from '@constants';
import { Header, Footer } from '@containers/com';
import { RegistMain, StudyMain, MyPageMain, SettingsMain, HomeMain } from '@containers/body';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    body: {
      backgroundColor: palette.grey[200],
      position: 'fixed',
      overflowY: 'auto',
      top: '64px',
      bottom: '72px',
      left: 0,
      right: 0,
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  })
);

export default (props: React.ComponentProps<any>) => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Header />
      <div className={classes.body}>
        <Switch>
          <Route exact path="/" component={HomeMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.RegistInit]} component={RegistMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.MyPage]} component={MyPageMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyInit]} component={StudyMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Settings]} component={SettingsMain} />
          <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Home]} component={HomeMain} />
        </Switch>
      </div>
      <Footer />
    </Grid>
  );
};
