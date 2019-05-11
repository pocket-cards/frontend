import * as React from 'react';
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { RegistInit, RegistList, RegistFinish } from '@containers/body/regist';
import { Grid } from '@material-ui/core';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

class A000 extends React.Component<Props, any, any> {
  render() {
    const { match, children } = this.props;

    return (
      <Grid container alignItems="center" justify="center">
        <Switch>
          <Route path={`${match.path}`} exact component={RegistInit} />
          <Route
            path={ROUTE_PATHS.Regist[ROUTE_PATH_INDEX.RegistList]}
            component={RegistList}
          />
          <Route
            path={ROUTE_PATHS.Regist[ROUTE_PATH_INDEX.RegistFinish]}
            component={RegistFinish}
          />
        </Switch>
        <Route children={children} />
      </Grid>
    );
  }
}

export default A000;

/** Properties */
export interface Props extends RouteComponentProps<{}> {}
