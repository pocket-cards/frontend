import * as React from 'react';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { RegistInit, RegistList, RegistFinish } from '@containers/body/regist';
import { Grid } from '@material-ui/core';

class Main extends React.Component<Props, any, any> {

  render() {
    const { match } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
      >
        <Switch>
          <Route path={`${match.url}`} exact component={RegistInit} />
          <Route path={`${match.url}/list`} component={RegistList} />
          <Route path={`${match.url}/finish`} component={RegistFinish} />
        </Switch>
      </Grid>
    );
  }
}

export default withRouter(Main);

/** State */
// export interface StateFromProps {
//   // tabIndex: number;
// }

/** Properties */
export interface Props extends RouteComponentProps<{}> {
}
