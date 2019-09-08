import * as React from 'react';
import useReactRouter from 'use-react-router';
import { Switch, Route } from 'react-router-dom';
import { GroupNew } from '@containers/body/mypage';

export default ({ children }: React.ComponentProps<any>) => {
  const { match } = useReactRouter();

  return (
    <React.Fragment>
      <Switch>
        <Route path={`${match.path}`} exact component={GroupNew} />
      </Switch>
      <Route children={children} />
    </React.Fragment>
  );
};
