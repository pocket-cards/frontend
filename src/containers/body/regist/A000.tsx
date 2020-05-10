import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { RegistInit, RegistList, RegistFinish } from '@containers/body/regist';
import { Paths } from '@constants';

export default ({ children }: React.ComponentProps<any>) => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route path={match.path} exact component={RegistInit} />
        <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.RegistList]} component={RegistList} />
        <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.RegistFinish]} component={RegistFinish} />
      </Switch>
      <Route children={children} />
    </React.Fragment>
  );
};
