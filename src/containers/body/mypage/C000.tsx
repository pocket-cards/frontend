import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { MypageInit } from '@containers/body/mypage';

export default ({ children }: React.ComponentProps<any>) => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Switch>
        <Route path={match.path} exact component={MypageInit} />
      </Switch>
      <Route children={children} />
    </React.Fragment>
  );
};
