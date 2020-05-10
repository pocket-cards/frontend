import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { StudyCards, StudyInit } from '@containers/body/study';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

export default (props: React.ComponentProps<any>) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route path={path} exact component={StudyInit} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]} component={StudyCards} />
      </Switch>
      <Route children={props.children} />
    </React.Fragment>
  );
};
