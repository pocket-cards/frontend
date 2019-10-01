import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { RegistInit, RegistList, RegistFinish } from '@containers/body/regist';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

// const useStyles = makeStyles(() =>
//   createStyles({
//     root: {
//       width: '100%',
//       minHeight: 'calc(100vh - 120px)',
//     },
//   })
// );

export default ({ children }: React.ComponentProps<any>) => {
  const { match } = useReactRouter();

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.path}`} exact component={RegistInit} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistList]} component={RegistList} />
        <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]} component={RegistFinish} />
      </Switch>
      <Route children={children} />
    </React.Fragment>
  );
};
