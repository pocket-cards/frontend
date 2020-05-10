import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Paths } from '@constants';
import { MyPageMain, HomeMain, StudyMain } from '@containers/body';
import Auth from '@containers/auth/Auth';
import SignIn from '@containers/auth/SignIn';

const routeConfig = (
  <Grid container direction="column">
    <Switch>
      <Route exact path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.SignIn]} component={SignIn} />
      <Auth>
        <Route path="/" component={HomeMain} />
      </Auth>
    </Switch>
  </Grid>
);

export default routeConfig;
