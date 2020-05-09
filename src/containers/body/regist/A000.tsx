import * as React from 'react';
import { useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { RegistInit, RegistList, RegistFinish } from '@containers/body/regist';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { State } from '@models';

const router = (state: State) => state.get('router');

export default ({ children }: React.ComponentProps<any>) => {
  const {
    location: { pathname },
  } = useSelector(router);

  return (
    <React.Fragment>
      <Switch>
        <Route path={pathname} exact component={RegistInit} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistList]} component={RegistList} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]} component={RegistFinish} />
      </Switch>
      <Route children={children} />
    </React.Fragment>
  );
};
