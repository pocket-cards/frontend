import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GroupList, GroupNew, GroupEdit } from '@containers/body/home';
import { Paths } from '@constants';

export default () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={GroupList} />
      <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.GroupRegist]} component={GroupNew} />
      <Route path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.GroupEdit]} component={GroupEdit} />
    </Switch>
  );
};
