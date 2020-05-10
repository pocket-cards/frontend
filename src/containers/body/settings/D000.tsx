import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { SettingsInit } from '@containers/body/settings';
import { State } from '@models';

export default (props: React.ComponentProps<any>) => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route path={match.path} exact component={SettingsInit} />
      </Switch>
      <Route children={props.children} />
    </React.Fragment>
  );
};
