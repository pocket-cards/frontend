import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { State } from '@models';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const Auth = (props: any) =>
  props.isLoggedIn ? <Route {...props} /> : <Redirect to={ROUTE_PATHS[ROUTE_PATH_INDEX.SignIn]} />;

const mapStateToProps = (state: State) => ({
  isLoggedIn: state.get('app').get('user') !== undefined,
});

export default connect(mapStateToProps)(Auth);

/** Properties */
export interface Props {
  isLoggedIn: boolean;
}
