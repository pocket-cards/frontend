import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Hub } from '@aws-amplify/core';
import { Paths } from '@constants';

const login: React.FunctionComponent<any> = (props) => {
  const [isLoading, setLoading] = React.useState(true);

  const authListener = ({ payload: { event, data } }: any) => {
    console.log(event, data);
    setLoading(false);
  };

  React.useEffect(() => {
    Hub.listen('auth', authListener);

    return () => {
      Hub.remove('auth', authListener);
    };
  }, [authListener]);

  if (isLoading) return <div />;

  return <Redirect to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Settings]} />;
};

export default login;
