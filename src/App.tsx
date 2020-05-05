import * as React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Grid, makeStyles, createStyles } from '@material-ui/core';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { Header, Footer } from '@containers/com';
import { RegistMain, StudyMain, MyPageMain, SettingsMain, HomeMain } from '@containers/body';
import { IState } from '@models';

const useStyles = makeStyles(() =>
  createStyles({
    body: {
      backgroundColor: 'whitesmoke',
      position: 'relative',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    icon: {
      color: 'white',
    },
  })
);

const app = (state: IState) => state.get('App');

export default (props: React.ComponentProps<any>) => {
  const classes = useStyles();
  const { showHeader } = useSelector(app);

  return (
    <Grid container direction="column">
      <Header />
      <div
        className={classes.body}
        style={{
          minHeight: showHeader ? 'calc(100vh - 136px)' : '100vh',
          maxHeight: showHeader ? 'calc(100vh - 136px)' : '100vh',
          height: showHeader ? 'calc(100vh - 136px)' : '100vh',
        }}>
        <Switch>
          <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} component={RegistMain} />
          <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]} component={MyPageMain} />
          <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]} component={StudyMain} />
          <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.Settings]} component={SettingsMain} />
          <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.Home]} component={HomeMain} />
          <Route component={HomeMain} />
        </Switch>
        <Route children={props.children} />
      </div>
      <Footer />
    </Grid>
  );
};
