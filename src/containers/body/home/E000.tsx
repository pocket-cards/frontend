import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GroupList, GroupNew, GroupEdit } from '@containers/body/home';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { State } from '@models';

const router = (state: State) => state.get('router');

export default (props: Props) => {
  const {
    location: { pathname },
  } = useSelector(router);

  return (
    <React.Fragment>
      <Switch>
        <Route path={pathname} exact component={GroupList} />
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
