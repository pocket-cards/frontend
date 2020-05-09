import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MypageInit } from '@containers/body/mypage';
import { State } from '@models';

const router = (state: State) => state.get('router');

export default ({ children }: React.ComponentProps<any>) => {
  const {
    location: { pathname },
  } = useSelector(router);

  return (
    <React.Fragment>
      <Switch>
        <Route path={pathname} exact component={MypageInit} />
      </Switch>
      <Route children={children} />
    </React.Fragment>
  );
};
