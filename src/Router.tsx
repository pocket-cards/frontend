import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
import SignIn from './containers/auth/SignIn';
import Login from './containers/auth/Login';
import Auth from './containers/auth/Auth';
import { Paths } from '@constants';

class Router extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.SignIn]} component={SignIn} />
          <Route exact path={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Login]} component={Login} />
          <Auth>
            <Route path="/" component={App} />
          </Auth>
        </Switch>
      </React.Fragment>
    );
  }
}

export default hot(Router);
