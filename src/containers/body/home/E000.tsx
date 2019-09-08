import * as React from 'react';
import { GroupList, GroupNew, GroupEdit } from '@containers/body/home';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { Route, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';

export default (props: Props) => {
  const { match } = useReactRouter();

  console.log(match);
  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.path}`} exact component={GroupList} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.GroupNew]} component={GroupNew} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.GroupEdit]} component={GroupEdit} />
      </Switch>
      <Route children={props.children} />
    </React.Fragment>
  );
};

interface Props {
  children?: any;
}
