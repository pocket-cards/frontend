import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { IState } from '@models';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const Auth = (props: any) => (props.isLoggedIn ? <Route {...props} /> : <Redirect to={ROUTE_PATHS[ROUTE_PATH_INDEX.SignIn]} />);

const mapStateToProps = (state: IState) => ({
  isLoggedIn: state.get('App').get('isLoggedIn'),
});

export default connect(mapStateToProps)(Auth);

/** Properties */
export interface Props {
  isLoggedIn: boolean;
}
