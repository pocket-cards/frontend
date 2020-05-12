import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Hub } from '@aws-amplify/core';
import { Paths } from '@constants';
import { Actions } from '@actions/app';

const login: React.FunctionComponent<any> = (props) => {
  const [isLoading, setLoading] = React.useState(true);
  const actions = bindActionCreators(Actions, useDispatch());

  const hubAuth = ({ payload: { event, data } }: any) => {
    console.log(event, data);
    switch (event) {
      case 'signIn':
        actions.loggedIn(data);
        break;
      case 'signOut':
        actions.logout();
        break;
    }

    setLoading(false);
  };

  React.useEffect(() => {
    Hub.listen('auth', hubAuth);
  }, []);

  if (isLoading) return <div />;

  return <Redirect to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Settings]} />;
};

export default login;
