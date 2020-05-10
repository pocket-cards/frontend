import * as React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { GroupList, GroupNew, GroupEdit } from '@containers/body/home';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

export default () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={GroupList} />
      <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.GroupNew]} component={GroupNew} />
      <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.GroupEdit]} component={GroupEdit} />
    </Switch>
  );
};
