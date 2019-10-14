import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { StudyCards, StudyInit } from '@containers/body/study';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

export default (props: React.ComponentProps<any>) => {
  const { match } = useReactRouter();

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.path}`} exact component={StudyInit} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]} component={StudyCards} />
        {/* <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyFinish]} component={StudyFinish} /> */}
      </Switch>
      <Route children={props.children} />
    </React.Fragment>
  );
};
