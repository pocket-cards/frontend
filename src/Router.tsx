import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import App from './App';
import SignIn from './containers/auth/SignIn';
import Auth from './containers/auth/Auth';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

class Router extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path={ROUTE_PATHS[ROUTE_PATH_INDEX.SignIn]} component={SignIn} />
          <Auth>
            <Route path="/" component={App} />
          </Auth>
        </Switch>
      </React.Fragment>
    );
  }
}

export default hot(module)(Router);
