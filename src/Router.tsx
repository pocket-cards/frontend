import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import App from './App';

class Router extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default hot(Router);
