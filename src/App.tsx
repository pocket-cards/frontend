import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { Header } from '@containers/com';
import { RegistMain, StudyMain, MyPageMain, SettingsMain } from '@containers/body';
import { IState } from '@models';

class App extends React.Component<Props, any> {
  render() {
    const { children, showHeader, classes } = this.props;

    return (
      <Grid container direction="column">
        <Header />
        <div
          className={classes.body}
          style={{
            minHeight: showHeader ? 'calc(100vh - 136px)' : '100vh',
            maxHeight: showHeader ? 'calc(100vh - 136px)' : '100vh',
            height: showHeader ? 'calc(100vh - 136px)' : '100vh',
          }}
        >
          <Switch>
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} component={RegistMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]} component={MyPageMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]} component={StudyMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.Settings]} component={SettingsMain} />
            <Route component={StudyMain} />
          </Switch>
          <Route children={children} />
        </div>
        {/* <Footer /> */}
      </Grid>
    );
  }
}

const styles = {
  root: {
    // minHeight: 'calc(100vh - 112px)',
  },
  body: {
    backgroundColor: 'whitesmoke',
    position: 'relative',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  icon: {
    color: 'white',
  },
};

const mapStateToProps = (state: IState) => ({
  showHeader: state.get('App').get('showHeader'),
});

export default compose(
  withRouter,
  withStyles(styles as any),
  connect(mapStateToProps),
)(App) as any;

/** Properties */
export interface Props extends WithStyles, RouteComponentProps<any> {
  showHeader?: boolean;
}
