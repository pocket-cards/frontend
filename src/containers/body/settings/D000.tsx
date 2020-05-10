import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { SettingsInit } from '@containers/body/settings';

export default () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact component={SettingsInit} />
    </Switch>
  );
};
